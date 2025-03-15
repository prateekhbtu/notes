from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.conf import settings
from pymongo import MongoClient
from bson import ObjectId

@login_required
@require_POST
def flush_jwt(request):
    user_id = request.user.id

    if not user_id:
        return JsonResponse({"error": "User ID not found in session"}, status=400)

    try:
        client = MongoClient(settings.MONGODB_URI)
        db = client[settings.MONGODB_DB]
        users_collection = db["users"]

        user = users_collection.find_one({"_id": ObjectId(user_id)})

        if not user:
            return JsonResponse({"error": "User not found"}, status=404)

        updated_plan_tier = user.get("planTier", "Free")

        return JsonResponse({
            "message": "JWT Updated",
            "updatedPlanTier": updated_plan_tier,
        })
    except Exception as e:
        print("Error fetching user data:", e)
        return JsonResponse({"error": "Internal Server Error"}, status=500)

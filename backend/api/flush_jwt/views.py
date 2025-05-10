from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import User
import json

@login_required
@require_POST
def flush_jwt(request):
    user_id = request.user.id

    if not user_id:
        return JsonResponse({"error": "User ID not found in session"}, status=400)

    try:
        user = get_object_or_404(User, id=user_id)
        updated_plan_tier = user.plan_tier if user.plan_tier else "Free"

        return JsonResponse({
            "message": "JWT Updated",
            "updatedPlanTier": updated_plan_tier,
        })
    except Exception as e:
        print("Error fetching user data:", e)
        return JsonResponse({"error": "Internal Server Error"}, status=500)

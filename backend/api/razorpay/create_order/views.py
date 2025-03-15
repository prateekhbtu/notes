from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json

DJANGO_BACKEND_URL = "http://localhost:8000"

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            tier = data.get("tier")
            university = data.get("university")
            degree = data.get("degree")
            year = data.get("year")
            semester = data.get("semester")
            couponCode = data.get("couponCode")
            userId = data.get("userId")

            response = requests.post(
                f"{DJANGO_BACKEND_URL}/api/create-order/",
                json={
                    "tier": tier,
                    "university": university,
                    "degree": degree,
                    "year": year,
                    "semester": semester,
                    "couponCode": couponCode,
                    "userId": userId,
                },
            )

            if response.status_code != 200:
                raise Exception("Failed to create order in Django backend")

            order = response.json()
            return JsonResponse(order)
        except Exception as e:
            print(f"Error Creating Razorpay Order: {e}")
            return JsonResponse({"error": "Failed to create order"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

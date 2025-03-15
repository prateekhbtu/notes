from django.http import JsonResponse
from django.views.decorators.http import require_POST
import requests

DJANGO_BACKEND_URL = "http://localhost:8000"

@require_POST
def redeem_referral_code(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    referee_id = request.user.id
    referee_name = request.user.username
    referee_email = request.user.email

    body = json.loads(request.body)
    coupon_code = body.get("couponCode")

    if not coupon_code:
        return JsonResponse({"error": "Coupon code is required"}, status=400)

    try:
        response = requests.post(
            f"{DJANGO_BACKEND_URL}/api/redeem-referral-code/",
            json={
                "refereeId": referee_id,
                "refereeName": referee_name,
                "refereeEmail": referee_email,
                "couponCode": coupon_code,
            },
        )

        if response.status_code != 200:
            raise Exception("Failed to redeem referral code in Django backend")

        data = response.json()
        return JsonResponse({"success": True, "referral": data})
    except Exception as error:
        print("Error redeeming referral code:", error)
        return JsonResponse({"error": "Failed to redeem referral code"}, status=500)

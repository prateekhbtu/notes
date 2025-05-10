from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Referral, User
import json

@csrf_exempt
@require_POST
def redeem_referral_code(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    try:
        data = json.loads(request.body)
        coupon_code = data.get("couponCode")

        if not coupon_code:
            return JsonResponse({"error": "Coupon code is required"}, status=400)

        referee = get_object_or_404(User, id=request.user.id)
        referral = get_object_or_404(Referral, coupon_code=coupon_code)

        if referral.is_redeemed:
            return JsonResponse({"error": "Coupon code already redeemed"}, status=400)

        referral.is_redeemed = True
        referral.redeemed_by = referee
        referral.save()

        return JsonResponse({"success": True, "referral": referral.to_dict()})
    except Exception as error:
        print("Error redeeming referral code:", error)
        return JsonResponse({"error": "Failed to redeem referral code"}, status=500)

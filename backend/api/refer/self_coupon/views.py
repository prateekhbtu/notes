from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import User, Referral
import json

@csrf_exempt
@require_POST
def generate_self_coupon(request):
    try:
        data = json.loads(request.body)
        user_id = data.get('userId')

        if not user_id:
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        user = get_object_or_404(User, id=user_id)

        # Generate self-coupon logic
        coupon_code = f"SELF-{user.id}"
        referral = Referral.objects.create(
            user=user,
            coupon_code=coupon_code,
            is_redeemed=False
        )

        return JsonResponse({'referral': referral.to_dict()})
    except Exception as error:
        print("Error generating self-coupon:", error)
        return JsonResponse({'error': 'Failed to generate self-coupon'}, status=500)

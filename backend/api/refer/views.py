from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.contrib.auth.decorators import login_required
from .models import Referral

@require_GET
@login_required
def get_referral(request):
    user_id = request.user.id
    try:
        referral = Referral.objects.get(user_id=user_id)
        return JsonResponse({'referral': referral.to_dict()})
    except Referral.DoesNotExist:
        return JsonResponse({'error': 'Failed to fetch referral'}, status=500)

@require_POST
@login_required
def create_referral(request):
    user_id = request.user.id
    referrer_name = request.user.username
    referrer_email = request.user.email
    try:
        referral = Referral.objects.create(
            user_id=user_id,
            referrer_name=referrer_name,
            referrer_email=referrer_email
        )
        return JsonResponse({'referral': referral.to_dict()})
    except Exception as e:
        return JsonResponse({'error': 'Failed to create referral code'}, status=500)

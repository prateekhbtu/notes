from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import get_object_or_404
from .models import Referral

def is_admin(user):
    return user.is_authenticated and user.is_admin

@require_GET
@login_required
@user_passes_test(is_admin)
def get_referrals(request):
    try:
        referrals = Referral.objects.all().values()
        return JsonResponse({"referrals": list(referrals)})
    except Exception as error:
        print("Error fetching referrals for admin:", error)
        return JsonResponse({"error": "Failed to fetch referrals"}, status=500)

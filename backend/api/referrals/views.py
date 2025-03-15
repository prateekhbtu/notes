from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import login_required, user_passes_test
import requests

DJANGO_BACKEND_URL = "http://localhost:8000"

def is_admin(user):
    return user.is_authenticated and user.is_admin

@require_GET
@login_required
@user_passes_test(is_admin)
def get_referrals(request):
    try:
        response = requests.get(f"{DJANGO_BACKEND_URL}/api/referrals/")
        response.raise_for_status()
        referrals = response.json()
        return JsonResponse({"referrals": referrals})
    except requests.RequestException as error:
        print("Error fetching referrals for admin:", error)
        return JsonResponse({"error": "Failed to fetch referrals"}, status=500)

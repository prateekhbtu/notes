from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import requests

DJANGO_BACKEND_URL = "http://localhost:8000"

@csrf_exempt
@require_POST
def generate_self_coupon(request):
    try:
        user_id = request.POST.get('userId')
        if not user_id:
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        response = requests.post(f"{DJANGO_BACKEND_URL}/api/generate-self-coupon/", data={'userId': user_id})

        if response.status_code != 200:
            raise Exception("Failed to generate self-coupon in Django backend")

        data = response.json()
        return JsonResponse({'referral': data})
    except Exception as error:
        print("Error generating self-coupon:", error)
        return JsonResponse({'error': 'Failed to generate self-coupon'}, status=500)

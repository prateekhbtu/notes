from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import User

@method_decorator(csrf_exempt, name='dispatch')
class SavePhoneView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_id = data.get('userId')
            phone_number = data.get('phoneNumber')

            if not phone_number or len(phone_number.strip()) < 10:
                return JsonResponse({'error': 'Invalid phone number'}, status=400)

            user = User.objects.filter(id=user_id).first()
            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)

            user.phone_number = phone_number
            user.save()

            return JsonResponse({'success': True, 'message': 'Phone number saved successfully'})
        except Exception as e:
            return JsonResponse({'error': 'Failed to save phone number'}, status=500)

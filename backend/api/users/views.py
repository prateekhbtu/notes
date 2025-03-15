from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import User

@method_decorator(csrf_exempt, name='dispatch')
class UserView(View):
    def get(self, request, *args, **kwargs):
        try:
            users = User.objects.all().values()
            return JsonResponse(list(users), safe=False)
        except Exception as error:
            return JsonResponse({'error': 'Failed to fetch users'}, status=500)

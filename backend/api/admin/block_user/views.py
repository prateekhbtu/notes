from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.shortcuts import get_object_or_404
from .models import User
import json

@method_decorator(csrf_exempt, name='dispatch')
class BlockUserView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            user_id = data.get('userId')
            block = data.get('block')

            if not email and not user_id:
                return JsonResponse(
                    {"error": "Either 'email' or 'userId' must be provided."},
                    status=400
                )

            if email:
                user = get_object_or_404(User, email=email)
            else:
                user = get_object_or_404(User, id=user_id)

            user.blocked = block
            user.save()

            return JsonResponse(
                {"message": f"User {'blocked' if block else 'unblocked'} successfully."},
                status=200
            )
        except Exception as e:
            return JsonResponse(
                {"error": "Internal server error."},
                status=500
            )

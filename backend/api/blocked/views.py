from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.shortcuts import get_object_or_404
from .models import User

ERROR_MESSAGES = {
    'INVALID_USER_ID': 'Invalid userId format.',
    'INVALID_ACTION': "Invalid action. Action must be 'block' or 'unblock'.",
    'USER_NOT_FOUND': 'User not found or already updated.',
    'SERVER_ERROR': 'Failed to update user status.',
    'FETCH_ERROR': 'Failed to fetch blocked users.',
}

@require_http_methods(["GET"])
def get_blocked_users(request):
    try:
        blocked_users = User.objects.filter(is_blocked=True)
        blocked_users_data = list(blocked_users.values('id', 'name', 'email'))
        return JsonResponse(blocked_users_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': ERROR_MESSAGES['FETCH_ERROR']}, status=500)

@require_http_methods(["POST"])
def update_user_status(request):
    try:
        data = json.loads(request.body)
        user_id = data.get('userId')
        action = data.get('action')

        if not user_id or not action:
            return JsonResponse({'error': ERROR_MESSAGES['INVALID_USER_ID']}, status=400)

        if action not in ['block', 'unblock']:
            return JsonResponse({'error': ERROR_MESSAGES['INVALID_ACTION']}, status=400)

        user = get_object_or_404(User, id=user_id)

        if action == 'block':
            user.is_blocked = True
        elif action == 'unblock':
            user.is_blocked = False

        user.save()
        return JsonResponse({'success': True})
    except ValidationError:
        return JsonResponse({'error': ERROR_MESSAGES['INVALID_USER_ID']}, status=400)
    except Exception as e:
        return JsonResponse({'error': ERROR_MESSAGES['SERVER_ERROR']}, status=500)

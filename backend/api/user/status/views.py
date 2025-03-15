from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_GET
from django.middleware.csrf import get_token

User = get_user_model()

@require_GET
def user_status(request):
    try:
        # Fetch the user from the request
        user = request.user

        # If no user is found, the user is not blocked
        if not user.is_authenticated:
            return JsonResponse({'blocked': False}, status=200)

        # Query the database to check if the user is blocked
        user = User.objects.filter(email=user.email).first()

        # Return the blocked status
        return JsonResponse({'blocked': user.Blocked if user else False}, status=200)
    except Exception as error:
        print(f"Failed to check blocked status: {error}")
        return JsonResponse({'error': 'Internal server error.'}, status=500)

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.core.exceptions import ValidationError
from bson import ObjectId
from .models import RequestNotes
import json

@require_POST
def update_request_status(request):
    try:
        data = json.loads(request.body)
        request_id = data.get('requestId')
        status = data.get('status')

        if not request_id or not status:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        if not ObjectId.is_valid(request_id):
            return JsonResponse({'error': 'Invalid request ID'}, status=400)

        try:
            request_note = RequestNotes.objects.get(id=request_id)
            request_note.status = status
            request_note.save()
        except RequestNotes.DoesNotExist:
            return JsonResponse({'error': 'Request not found'}, status=404)

        return JsonResponse({'success': True})
    except ValidationError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'Internal server error'}, status=500)

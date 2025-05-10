from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from bson import ObjectId
from .models import NotesRequest

ERROR_MESSAGES = {
    "SERVER_ERROR": "Failed to fetch notes requests.",
    "INVALID_OBJECT_ID": "Invalid userId format in requestNotes.",
    "INVALID_REQUEST": "Invalid request payload.",
    "UPDATE_FAILED": "Failed to update the request.",
}

@csrf_exempt
@require_http_methods(["GET"])
def get_notes_requests(request):
    try:
        notes_requests = list(NotesRequest.objects.all().values())
        return JsonResponse(notes_requests, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": ERROR_MESSAGES["SERVER_ERROR"]}, status=500)

@csrf_exempt
@require_http_methods(["PATCH"])
def update_notes_request_status(request):
    try:
        body = json.loads(request.body)
        request_id = body.get("requestId")
        status = body.get("status")

        if not ObjectId.is_valid(request_id):
            return JsonResponse({"error": ERROR_MESSAGES["INVALID_OBJECT_ID"]}, status=400)

        valid_statuses = ["Pending", "In Progress", "Completed", "Rejected"]
        if status not in valid_statuses:
            return JsonResponse({"error": ERROR_MESSAGES["INVALID_REQUEST"]}, status=400)

        notes_request = NotesRequest.objects.get(id=request_id)
        notes_request.status = status
        notes_request.save()

        return JsonResponse({"success": True}, status=200)
    except NotesRequest.DoesNotExist:
        return JsonResponse({"error": ERROR_MESSAGES["UPDATE_FAILED"]}, status=404)
    except Exception as e:
        return JsonResponse({"error": ERROR_MESSAGES["SERVER_ERROR"]}, status=500)

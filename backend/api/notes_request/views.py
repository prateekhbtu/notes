from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from bson import ObjectId
from .models import NotesRequest

ERROR_MESSAGES = {
    "MISSING_FIELDS": "All fields are required.",
    "USER_NOT_FOUND": "User not found.",
    "USER_BLOCKED": "You are blocked by an admin from submitting requests.",
    "INVALID_USER_ID": "Invalid user ID format.",
    "INVALID_REQUEST_ID": "Invalid request ID format.",
    "SERVER_ERROR": "Internal server error.",
    "REQUEST_NOT_FOUND": "Request not found.",
}
SUCCESS_MESSAGE = "Request successfully updated."

@csrf_exempt
@require_http_methods(["POST"])
def create_notes_request(request):
    try:
        requestBody = json.loads(request.body)
        university = requestBody.get("university")
        degree = requestBody.get("degree")
        year = requestBody.get("year")
        semester = requestBody.get("semester")
        subject = requestBody.get("subject")
        syllabus = requestBody.get("syllabus")
        phoneNumber = requestBody.get("phoneNumber")
        userId = requestBody.get("userId")

        requiredFields = [
            "university",
            "degree",
            "year",
            "semester",
            "subject",
            "syllabus",
            "phoneNumber",
            "userId",
        ]

        missingFields = [field for field in requiredFields if not requestBody.get(field)]

        if missingFields:
            return JsonResponse(
                {"error": f"{ERROR_MESSAGES['MISSING_FIELDS']}: {', '.join(missingFields)}"},
                status=400
            )

        if not ObjectId.is_valid(userId):
            return JsonResponse({"error": ERROR_MESSAGES["INVALID_USER_ID"]}, status=400)

        notes_request = NotesRequest(
            university=university,
            degree=degree,
            year=year,
            semester=semester,
            subject=subject,
            syllabus=syllabus,
            phoneNumber=phoneNumber,
            userId=userId
        )
        notes_request.save()

        return JsonResponse({"message": SUCCESS_MESSAGE}, status=200)
    except Exception as error:
        print("Failed to save request notes:", error)
        return JsonResponse({"error": ERROR_MESSAGES["SERVER_ERROR"]}, status=500)

@csrf_exempt
@require_http_methods(["PATCH"])
def update_notes_request_status(request):
    try:
        requestBody = json.loads(request.body)
        requestId = requestBody.get("requestId")
        status = requestBody.get("status")

        if not requestId or not status:
            return JsonResponse({"error": "Request ID and status are required."}, status=400)

        if not ObjectId.is_valid(requestId):
            return JsonResponse({"error": "Invalid Request ID."}, status=400)

        notes_request = NotesRequest.objects.get(id=requestId)
        notes_request.status = status
        notes_request.save()

        return JsonResponse({"success": True}, status=200)
    except NotesRequest.DoesNotExist:
        return JsonResponse({"error": ERROR_MESSAGES["REQUEST_NOT_FOUND"]}, status=404)
    except Exception as error:
        print("Failed to update request status:", error)
        return JsonResponse({"error": "Internal Server Error"}, status=500)

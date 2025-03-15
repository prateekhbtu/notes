from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import requests
import json

LANGUAGE_MAP = {
    'c': 50,
    'cpp': 54,
    'python': 71,
    'java': 62,
    'javascript': 63,
}

@csrf_exempt
@require_POST
def execute_code(request):
    try:
        data = json.loads(request.body)
        code = data.get('code')
        language = data.get('language')

        response = requests.post(
            "https://api.judge0.com/submissions",
            json={
                'source_code': code,
                'language_id': LANGUAGE_MAP[language],
                'stdin': '',
                'redirect_stderr_to_stdout': True
            }
        )

        data = response.json()
        return JsonResponse({
            'output': data.get('stdout') or data.get('stderr') or data.get('message'),
            'status': data.get('status', {}).get('description')
        })
    except Exception as error:
        return JsonResponse({'error': 'Failed to execute code'}, status=500)

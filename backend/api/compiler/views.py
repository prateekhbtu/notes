from django.http import JsonResponse
import requests

LANGUAGE_MAP = {
    'c': 50,
    'cpp': 54,
    'python': 71,
    'java': 62,
    'javascript': 63,
}

def execute_code(request):
    if request.method == 'POST':
        data = request.json()
        code = data.get('code')
        language = data.get('language')

        try:
            response = requests.post(
                f"{DJANGO_BACKEND_URL}/api/execute-code/",
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

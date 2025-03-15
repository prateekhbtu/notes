from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .autoCompletePrefixTree import globalPrefixTree, initPrefixTree, PrefixTree
import json

@csrf_exempt
@require_POST
def search(request):
    try:
        data = json.loads(request.body)
        query = data.get('query', '').lower()
        tree = PrefixTree()
        if not globalPrefixTree:
            initPrefixTree()
        result = globalPrefixTree._search(query)
        return JsonResponse(result, safe=False)
    except Exception as e:
        return JsonResponse({'error': 'Internal server error'}, status=500)

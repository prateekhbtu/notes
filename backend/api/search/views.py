from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .autoCompletePrefixTree import globalPrefixTree, initPrefixTree, PrefixTree

@csrf_exempt
def search(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        query = data.get('query', '').lower()
        tree = PrefixTree()
        if not globalPrefixTree:
            initPrefixTree()
        result = globalPrefixTree._search(query)
        return JsonResponse(result, safe=False)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

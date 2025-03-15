from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.utils.dateparse import parse_date
from .models import Coupon

@require_http_methods(["GET"])
def get_coupons(request):
    try:
        coupons = Coupon.objects.all().values()
        return JsonResponse(list(coupons), safe=False)
    except Exception as e:
        return JsonResponse({"error": "Failed to fetch coupons"}, status=500)

@require_http_methods(["POST"])
def create_coupon(request):
    try:
        data = json.loads(request.body)
        code = data.get("code")
        type = data.get("type")
        value = data.get("value")
        expiry_date = data.get("expiryDate")
        usage_limit = data.get("usageLimit")

        if not code or not type or value is None:
            return JsonResponse({"error": "Missing required fields"}, status=400)
        if type not in ["flat", "percent"]:
            return JsonResponse({"error": "Invalid coupon type"}, status=400)

        coupon = Coupon(
            code=code,
            type=type,
            value=value,
            expiry_date=parse_date(expiry_date) if expiry_date else None,
            usage_limit=usage_limit,
        )
        coupon.save()
        return JsonResponse({"success": True, "coupon": coupon.to_dict()})
    except Exception as e:
        return JsonResponse({"error": "Failed to create coupon"}, status=500)

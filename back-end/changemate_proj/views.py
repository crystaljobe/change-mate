from django.http import JsonResponse
import pytz

def get_timezones(request):
    '''get most common timezones in reverse order so US timezones are listed first'''
    timezones = pytz.common_timezones
    timezones.reverse()
    return JsonResponse({'timezones': timezones}, safe=False)
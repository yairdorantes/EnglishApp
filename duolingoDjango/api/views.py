import json
from django.views import View
from .models import User, Cards
from django.http.response import JsonResponse
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json


class userView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if (id > 0):
            users = list(User.objects.filter(id=id).values())
            if len(users) > 0:
                user = users[0]
                data = {'message': 'success', 'user': user}
            else:
                data = {'message': 'user not found'}
            return JsonResponse(data)
        else:
            users = list(User.objects.values())
        if len(users) > 0:
            data = {'message': 'success', 'users': users}
        else:
            data = {'message': 'user not found'}
        return JsonResponse(data)

    def post(self, request):
        # print(request.body)
        jd = json.loads(request.body)
      #   print(jd)
        User.objects.create(
            username=jd['name'], email=jd['email'], password=jd['password'])
        data = {'message': 'success'}
        return JsonResponse(data)

    def put(self, request, id):
        jd = json.loads(request.body)
        users = list(User.objects.filter(id=id).values())
        if len(users) > 0:
            user = User.objects.get(id=id)
            user.username = jd['name']
            user.email = jd['email']
            user.password = jd['password']
            user.save()
            data = {'message': 'success'}

        else:
            data = {'message': 'user not found'}
        return JsonResponse(data)

    def delete(self, request, id):
        users = list(User.objects.filter(id=id).values())
        if len(users) > 0:
            User.objects.filter(id=id).delete()
            data = {'message': 'success'}

        else:
            data = {'message': 'user not found'}
        return JsonResponse(data)


class cardView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):

        cards = list(Cards.objects.values())
        if len(cards) > 0:
            data = {'message': 'success', 'cards': cards}
        else:
            data = {'message': 'card not found'}
        return JsonResponse(data)

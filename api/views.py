from dbm import error
import json
from django.views import View
from .models import Cards, Comment, Post, UserModel, CategoriaCard, VerbsModel
from rest_framework import viewsets
from .serializers import PostSerializer
from django.http.response import JsonResponse
from django.http import HttpResponse

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.db import IntegrityError

# from time import sleep
import base64
from django.core.files.base import ContentFile

# import openai
import random
import redis
from gtts import gTTS
import base64
from io import BytesIO
import os

# jaja

r = redis.Redis(
    host="containers-us-west-177.railway.app",
    port=6091,
    password="wBW5LUEzyADNvF1K8thZ",
)

User = get_user_model()
# print(os.environ["OPEN_AI_KEY"],"loli")


class TopUsers(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        top_users = list(UserModel.objects.all().order_by("-score")[:3].values())
        # print(top_users)
        return JsonResponse({"topuser": top_users})


# k


class VerbsView(View):
    def get(self, request, user):
        if user > 0:
            verbs = list(VerbsModel.objects.filter(owner=user).values())
            return JsonResponse({"verbs": verbs})

    def post(self, request):
        jd = json.loads(request.body)
        VerbsModel.objects.create(
            owner_id=jd["owner"],
            infinitive=jd["infinitive"],
            past=jd["past"],
            participle=jd["participle"],
            spanish=jd["spanish"],
        )
        return HttpResponse("oki", status=200)

    def delete(self, request):
        jd = json.loads(request.body)
        print(jd)
        VerbsModel.objects.filter(id__in=jd).delete()
        return HttpResponse("oki", status=200)


class IncreaseScore(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, id=0):
        # jd = json.loads(request.body)
        user_id = User.objects.get(id=id)
        user_id.score += 1
        user_id.save()
        data = {"res": "result"}
        return JsonResponse(data)


class CategoryView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        categories = {"categories": list(CategoriaCard.objects.values())}
        # cards = shuffle(cards)
        # sleep(1.3)
        return JsonResponse(categories)


class userView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if id > 0:
            users = list(UserModel.objects.filter(id=id).values())
            if len(users) > 0:
                user = users[0]
                data = {"message": "success", "user": user}
            else:
                data = {"message": "user not found"}
            return JsonResponse(data)
        else:
            users = list(User.objects.values())
        if len(users) > 0:
            data = {"message": "success", "users": users}
        else:
            data = {"message": "user not found"}
        return JsonResponse(data)

    def post(self, request):
        # print(request.body)
        jd = json.loads(request.body)
        #   print(jd)
        try:
            User.objects.create_user(
                username=jd["username"], email=jd["email"], password=jd["password"]
            )
            return HttpResponse("success", status=200)
        except IntegrityError:
            return HttpResponse("Nombre de usuario ocupado elige otro", status=409)

    def put(self, request, id):
        jd = json.loads(request.body)
        users = list(User.objects.filter(id=id).values())
        if len(users) > 0:
            user = User.objects.get(id=id)
            user.username = jd["name"]
            user.email = jd["email"]
            user.password = jd["password"]
            user.save()
            data = {"message": "success"}

        else:
            data = {"message": "user not found"}
        return JsonResponse(data)

    def delete(self, request, id):
        users = list(User.objects.filter(id=id).values())
        if len(users) > 0:
            User.objects.filter(id=id).delete()
            data = {"message": "success"}

        else:
            data = {"message": "user not found"}
        return JsonResponse(data)


class DeleteCard(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        jd = json.loads(request.body)
        lista = jd["del_these"]
        Cards.objects.filter(id__in=lista).delete()
        return HttpResponse("ok", status=200)


class cardView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # k
    def get(self, request, section="", id=0):
        if section != "":
            cards = list(
                Cards.objects.filter(
                    categoria=CategoriaCard.objects.get(name=section)
                ).values()
            )
            # cards = list(Cards.objects.filter(id=1).values())
            if len(cards) > 0:
                random.shuffle(cards)

                data = {"message": "success", "cards": cards}
            else:
                data = {"message": " no cards found"}
            return JsonResponse(data)
        if id > 0:
            cards = list(Cards.objects.filter(owner_id=id).values())
            if len(cards) > 0:
                random.shuffle(cards)

                data = {"message": "success", "cards": cards}
            else:
                data = {"message": "no cards"}
            return JsonResponse(data)

        else:
            cards = list(Cards.objects.values())
            if len(cards) > 0:
                random.shuffle(cards)
                data = {"message": "success", "cards": cards}
            else:
                data = {"message": "card not found"}
            # sleep(1.3)
            return JsonResponse(data)

    def post(self, request):
        jd = json.loads(request.body)
        exists = Cards.objects.filter(cardTitle=jd["cardTitle"]).first()
        if not exists:
            text = jd["cardTitle"]
            # Create an instance of gTTS
            tts = gTTS(text=text, lang="en")
            # Create a memory buffer to store the binary data
            buffer = BytesIO()
            # Write the audio data to the memory buffer
            tts.write_to_fp(buffer)
            # Rewind the buffer to the beginning
            buffer.seek(0)
            # Encode the binary data into a base64 string
            audio_base64 = base64.b64encode(buffer.read()).decode("utf-8")
            # print(audio_base64)
            Cards.objects.create(
                owner_id=jd["owner_id"],
                cardTitle=jd["cardTitle"],
                cardMeaning=jd["cardMeaning"],
                image=jd["image"],
                cardSound=audio_base64,
            )
            print("hereee")
            return HttpResponse("success", status=200)

        return HttpResponse("bad", 505)

    def put(self, request, id):
        jd = json.loads(request.body)
        card_to_edit = Cards.objects.get(id=id)
        card_to_edit.cardTitle = jd["cardTitle"]
        card_to_edit.cardMeaning = jd["cardMeaning"]
        card_to_edit.image = jd["image"]
        card_to_edit.save()
        return HttpResponse("oki", status=200)


class GetPostView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if id > 0:
            post = list(Post.objects.filter(id=id).values())

            data = {"post": post}
            return JsonResponse(data)
        else:
            return JsonResponse(None)


class PostView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        # print(request.body)

        jd = json.loads(request.body)
        post = Post.objects.get(id=jd["id"])
        if jd["is_like"] == True:
            post.likes.add(User.objects.get(id=jd["user_id"]))
            data = {"message": "like"}
            post.likes_count += 1
            post.save()
        else:
            post.likes.remove(User.objects.get(id=jd["user_id"]))
            post.likes_count -= 1
            post.save()
            data = {"message": "no like"}
        return JsonResponse(data)


class PostSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        posts = Post.objects.all()
        return posts


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # username_field = User.EMAIL_FIELD
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        #   token['email'] = user.email
        #   token['score'] = user.score
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = ["api/token", "api/token/refresh"]
    return Response(routes)


class userToPremium(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def put(self, request, id):
        # jd = json.loads(request.body)
        user = User.objects.get(id=id)
        user.premium = True
        user.save()
        data = {"message": "user is now premium!"}
        return JsonResponse(data)


# This is your test secret API key.

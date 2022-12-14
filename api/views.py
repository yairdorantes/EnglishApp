import json
from django.views import View
from .models import Cards, Comment, Post, UserModel,CategoriaCard
from rest_framework import viewsets
from .serializers import  PostSerializer
from django.http.response import JsonResponse
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
from time import sleep
import base64
from django.core.files.base import ContentFile
import openai
import random
import os
openai.api_key = os.environ["OPEN_AI_KEY"]
model_engine = "text-davinci-003"

User = get_user_model()
# print(os.environ["OPEN_AI_KEY"],"loli")

 
class TopUsers(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    def get(self, request):
        top_users = list(UserModel.objects.all().order_by('-score')[:3].values())
        print(top_users)
        return JsonResponse({"topuser":top_users})
# k


class Phrases(View):
    def get(self,request,word):
        prompt = f"create a phrase that includes the word {word}"
        completions = openai.Completion.create(
            engine=model_engine,
            prompt=prompt,
            max_tokens=1000,
            n=5,  # increase the number of generated phrases
            stop=None,
            temperature=0.9  # increase the temperature
            )
        selected_phrase = random.choice(completions.choices)
        print(selected_phrase.text)

     
        return JsonResponse({"phrase": selected_phrase.text.strip()})




class IncreaseScore(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    def post(self, request,id=0):
        # jd = json.loads(request.body)
        user_id = User.objects.get(id=id)
        user_id.score+=1
        user_id.save()
        data={"res":"result"}
        return JsonResponse(data)  
      

class CategoryView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
     
    def get(self,request):    
        categories = list(CategoriaCard.objects.values())
       # cards = shuffle(cards)
        if len(categories) > 0:
            data = {'categories': categories}
        else:
            data = {'message': 'card not found'}
        # sleep(1.3)
        return JsonResponse(data)


class userView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if (id > 0):
            users = list(UserModel.objects.filter(id=id).values())
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

        User.objects.create_user(
            username=jd['username'], email=jd['email'], password=jd['password'])
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
     
    def get(self, request,section="",id=0):

        if(section!=""):
            cards = list(Cards.objects.filter(categoria=CategoriaCard.objects.get(name=section)).values())
            # cards = list(Cards.objects.filter(id=1).values())
            if len(cards)>0:
                data = {'message':'success', 'cards': cards}
            else:
                data = {'message':" no cards found"}
            return JsonResponse(data)
        if id>0:
            cards = list(Cards.objects.filter(owner_id=id).values())
            if len(cards) > 0:
                data = {'message': 'success', 'cards': cards}
            else:
                data = {'message': 'no cards'}
            return JsonResponse(data)

        else:
            cards = list(Cards.objects.values())
       # cards = shuffle(cards)
            if len(cards) > 0:
                data = {'message': 'success', 'cards': cards}
            else:
                data = {'message': 'card not found'}
        # sleep(1.3)
            return JsonResponse(data)
    def post(self,request):
        jd = json.loads(request.body)
        try:
            base64Image = jd["file"]
            format,imgstr = base64Image.split(";base64,")
            ext = format.split('/')[-1]
            dataFile = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

            card = Cards.objects.create(owner_id=jd["user"],
            cardTitle=jd['title'],
             cardMeaning=jd["meaning"],
            cardImage=dataFile)
            card.save()
            data = {'message': 'success'}
        except:
            card = Cards.objects.create(owner_id=jd["user"],
            cardTitle=jd['title'],
            cardMeaning=jd["meaning"],
            cardImage="",
            imageURL=jd["img_url"])
            card.save()
            data = {'message': 'success'}
        return JsonResponse(data)
    def put(self,request,id):
        jd = json.loads(request.body)
        card_to_edit = Cards.objects.get(id=id)
        print(len(jd["file"]))
        if(len(jd["file"])>0):
            base64Image = jd["file"]
            format,imgstr = base64Image.split(";base64,")
            ext = format.split('/')[-1]
            dataFile = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
            card_to_edit.cardImage = dataFile
            card_to_edit.imageURL=""
        if(len(jd["img_url"])>0):
            card_to_edit.imageURL = jd['img_url']
            card_to_edit.cardImage=""   
        card_to_edit.cardTitle = jd['title']
        card_to_edit.cardMeaning = jd['meaning']
        card_to_edit.save()
        data = {'message':'success'}

        return JsonResponse(data)        
      
    def delete(self, request, card):
        Cards.objects.get(id=card).delete()
        data = {'message': 'success'}
        # card = list(Cards.objects.filter(id=id).values())
        # if len(card) > 0:
        # else:
        #     data = {'message': 'user not found'}
        return JsonResponse(data)

class GetPostView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):

        if (id > 0):
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
        post = Post.objects.get(id=jd['id'])
        if (jd["is_like"] == True):
            post.likes.add(
                User.objects.get(id=jd['user_id']))
            data = {'message': 'like'}
            post.likes_count += 1
            post.save()
        else:
            post.likes.remove(
                User.objects.get(id=jd['user_id']))
            post.likes_count -= 1
            post.save()
            data = {'message': 'no like'}
        return JsonResponse(data)


class CommentView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if id > 0:
            comments = list(Comment.objects.filter(post_id=id).values())

            if len(comments) > 0:
                data = {'comments': comments}
            else:
                data = {'comments': []}
        else:
            data = {'message': 'MAS POST'}
      #  sleep(1.3)
        return JsonResponse(data)

   # @method_decorator(csrf_exempt)
    def post(self, request):
        jd = json.loads(request.body)
        comment = Comment.objects.create(post_id=jd["post_id"],
                                         author=jd["user_name"], text=jd["comentario"], created_date=jd["date"])
        comment.save()
        data = {'message': "success"}
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
        token['username'] = user.username
     #   token['email'] = user.email
     #   token['score'] = user.score
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]
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
        data = {'message': 'user is now premium!'}
        return JsonResponse(data)


# This is your test secret API key.

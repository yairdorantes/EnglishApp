from django.contrib import admin
from .models import CategoriaCard, Comment, UserModel, Cards, ShortsV2, AnswersForShortsV2, CategoriaPost, Post


admin.site.register([UserModel, Cards, ShortsV2,
                    AnswersForShortsV2, CategoriaPost, Post, Comment,CategoriaCard])

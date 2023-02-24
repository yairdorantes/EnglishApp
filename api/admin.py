from django.contrib import admin
from .models import CategoriaCard, Comment, UserModel, Cards, CategoriaPost, Post


admin.site.register([UserModel, Cards, CategoriaPost, Post, Comment, CategoriaCard])

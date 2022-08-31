from django.urls import path
from .views import userView, cardView
urlpatterns = [
    path('users/', userView.as_view(), name='users_list'),
    path('users/<int:id>', userView.as_view(), name='users_process'),
    path('cards/', cardView.as_view(), name='cards_list'),
]

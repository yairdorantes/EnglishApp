from crypt import methods
from posixpath import basename
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from xml.etree.ElementInclude import include
from django.urls import path, include

from django.views.decorators.csrf import csrf_exempt

from .views import (
    userView,
    cardView,
    getRoutes,
    MyTokenObtainPairView,
    userToPremium,
    PostView,
    PostSet,
    GetPostView,
    TopUsers,
    IncreaseScore,
    CategoryView,
    VerbsView,
    DeleteCard,
    LearnCard,
    CheckOutStripeView,
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()


router.register("postset", PostSet, basename="postset")

urlpatterns = [
    path("users/", userView.as_view(), name="users_list"),
    path("users/<int:id>", userView.as_view(), name="users_process"),
    path("cards/", cardView.as_view(), name="cards_list"),
    path("cards/<str:section>", cardView.as_view(), name="cards_list3"),
    path("cards/delete/", DeleteCard.as_view(), name="cards_delete"),
    path("usercards/<int:id>", cardView.as_view(), name="cards_list2"),
    path("delcard/<int:card>", cardView.as_view(), name="cards_list1"),
    # path('shorts/', shortView.as_view(), name='shorts_list'),
    path("card-edit/<int:id>", cardView.as_view(), name="edit card"),
    path("categories", CategoryView.as_view(), name="categories"),
    path("routes/", getRoutes),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("makepremium/<int:id>", userToPremium.as_view(), name="user_to_premium"),
    path("post/<int:id>", GetPostView.as_view(), name="post"),
    path("posts/", PostView.as_view(), name="posts list"),
    path("posts/<int:id>", PostView.as_view(), name="liked posts by user"),
    path("topusers/", TopUsers.as_view(), name="top users"),
    path("increase/<int:id>", IncreaseScore.as_view(), name="increase score"),
    path("verbs/<int:user>", csrf_exempt(VerbsView.as_view()), name="user verbs"),
    path("verbs", csrf_exempt(VerbsView.as_view()), name="user verbs"),
    path("checkout", csrf_exempt(CheckOutStripeView.as_view()), name="checkout"),
    path(
        "learn/<int:user_id>",
        csrf_exempt(LearnCard.as_view()),
        name="learn card",
    ),
    path("", include(router.urls)),
]
# khk

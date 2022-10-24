
from .models import Cards, Comment, ShortsV2, AnswersForShortsV2, CategoriaPost, Post
from rest_framework import serializers


class AnswerShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswersForShortsV2
        fields = "__all__"


class ShortsV2Serializer(serializers.ModelSerializer):
    answers = AnswerShortSerializer(many=True, read_only=True)

    class Meta:
        model = ShortsV2
        fields = "__all__"
        depth = 1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaPost
        fields = "__all__"


##############################################

class PostSerializer(serializers.ModelSerializer):
    categoria = CategorySerializer()
  #  comments = CommentSerializer()

    class Meta:
        model = Post
        fields = "__all__"

class serializeImage(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField("get_image_url")
    class Meta:
        model = Cards
        fields = "__all__"
    def get_image_url(self,obj):
        return obj.cardImage.url

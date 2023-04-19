from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

from gtts import gTTS
import base64
from io import BytesIO
from django.contrib import admin


# class MaxCard(models.Model):
#     maximum = models.IntegerField(default=)
class UserModel(AbstractUser):
    premium = models.BooleanField(default=True, verbose_name="premium")
    score = models.IntegerField(default=0, null=True)
    # utc=models.BooleanField(default=False, verbose_name="UTC alumno")
    # username = models.CharField(max_length=100, verbose_name='User name')
    # email = models.EmailField(verbose_name='User email',unique=True)
    # password = models.CharField(max_length=128, verbose_name='password')
    # active_user=models.BooleanField(default=True)
    # USERNAME_FIELD = 'email'
    # def __str__(self):
    #    return self.username


class CategoriaCard(models.Model):
    name = models.CharField(
        max_length=100, unique=False, verbose_name="Category Cards", null=True
    )
    icon = models.URLField(default="http://127.0.0.1:8000/", verbose_name="icon source")
    bg_image = models.URLField(
        default="http://127.0.0.1:8000/", verbose_name="background source"
    )

    class Meta:
        verbose_name = "Category Cards"

    # ordering = ['id']

    def __str__(self):
        return self.name


class Cards(models.Model):
    owner = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=True, blank=True
    )
    categoria = models.ForeignKey(
        CategoriaCard, on_delete=models.CASCADE, null=True, blank=True
    )
    cardTitle = models.CharField(max_length=50, verbose_name="Card title")
    cardMeaning = models.CharField(max_length=50, verbose_name="Card meaning")
    cardSound = models.TextField(verbose_name="Sound Src", blank=True, null=True)
    cardImage = models.ImageField(
        verbose_name="Card image",
        upload_to="cards",
        null=True,
        blank=True,
    )
    imageURL = models.URLField(blank=True, verbose_name="Image source")

    class Meta:
        ordering = ["-id"]

    def delete(self, *args, **kwargs):
        self.cardImage.delete()
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.cardTitle


def change_sound(sender, instance, **kwargs):
    text = instance.cardTitle
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
    Cards.objects.filter(id=instance.id).update(cardSound=audio_base64)

    print("sound changed")


post_save.connect(change_sound, sender=Cards)


class CategoriaPost(models.Model):
    name = models.CharField(
        max_length=100, null=False, unique=False, verbose_name="Category Post"
    )
    color = models.CharField(
        max_length=100, verbose_name="color ategory", default="#FFFFFF"
    )

    class Meta:
        verbose_name = "Category"

    # ordering = ['id']

    def __str__(self):
        return self.name


class VerbsModel(models.Model):
    owner = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=True, blank=True
    )
    infinitive = models.CharField(max_length=50, verbose_name="Infinitive")
    past = models.CharField(max_length=50, verbose_name="past")
    participle = models.CharField(max_length=50, verbose_name="participle")
    spanish = models.CharField(max_length=50, verbose_name="spanish")
    inf_sound = models.TextField(verbose_name="sound", default="")
    past_sound = models.TextField(verbose_name="sound", default="")
    participle_sound = models.TextField(verbose_name="sound", default="")

    def __str__(self):
        return self.infinitive


# def convert_text_to_sound(text):
#     # Create an instance of gTTS
#     tts = gTTS(text=text, lang="en")
#     # Create a memory buffer to store the binary data
#     buffer = BytesIO()
#     # Write the audio data to the memory buffer
#     tts.write_to_fp(buffer)
#     # Rewind the buffer to the beginning
#     buffer.seek(0)
#     # Encode the binary data into a base64 string
#     audio_base64 = base64.b64encode(buffer.read()).decode("utf-8")


#     return audio_base64
import base64
import io
import time


def convert_text_to_sound(text):
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
    return audio_base64


def set_sound_verbs(sender, instance, **kwargs):
    audio_base64_1 = convert_text_to_sound(instance.infinitive)
    audio_base64_2 = convert_text_to_sound(instance.past)
    audio_base64_3 = convert_text_to_sound(instance.participle)
    VerbsModel.objects.filter(id=instance.id).update(
        inf_sound=audio_base64_1,
        past_sound=audio_base64_2,
        participle_sound=audio_base64_3,
    )
    print("sound changed")


post_save.connect(set_sound_verbs, sender=VerbsModel)


class Post(models.Model):
    categoria = models.ForeignKey(CategoriaPost, on_delete=models.CASCADE, null=True)
    image = models.FileField(
        upload_to="PostImage", verbose_name="Post image", blank=True, null=True
    )
    title = models.CharField(max_length=500, verbose_name="Post title")
    #  intro = models.CharField(max_length=500, verbose_name="Post intro")
    content = models.TextField(blank=True, verbose_name="Post content")
    image_src = models.URLField(
        default=f"http://127.0.0.1:8000/{image}", verbose_name="post image source "
    )
    # likes = models.IntegerField(default=0, verbose_name="post likes")
    likes = models.ManyToManyField(UserModel, verbose_name="Post likes", blank=True)

    likes_count = models.IntegerField(default=0, verbose_name="Post likes counter")

    def delete(self, *args, **kwargs):
        self.image.delete()
        # os.remove(os.path.join(settings.MEDIA_ROOT, self.image))
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.CharField(max_length=255)
    text = models.TextField(blank=True, verbose_name="comment")
    created_date = models.CharField(max_length=255)
    approved_comment = models.BooleanField(default=True)
    #  dates = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.text


"""
THIS IS TO ORDER WHAT YOU WANT(IN THIS CASE POSITION_CARD VALUES)
MODELS
    class Meta:
        ordering = ["positionCard"]
"""

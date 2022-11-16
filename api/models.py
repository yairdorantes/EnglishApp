

from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractUser

# class MaxCard(models.Model):
#     maximum = models.IntegerField(default=)
class UserModel(AbstractUser):
    premium = models.BooleanField(default=False, verbose_name='premium')
    score = models.IntegerField(default=0,null=True)
    # username = models.CharField(max_length=100, verbose_name='User name')
    # email = models.EmailField(verbose_name='User email',unique=True)
    # password = models.CharField(max_length=128, verbose_name='password')
    # active_user=models.BooleanField(default=True)
    # USERNAME_FIELD = 'email'
    # def __str__(self):
    #    return self.username


class CategoriaCard(models.Model):
    name = models.CharField(
        max_length=100,  unique=False, verbose_name='Category Cards',null=True)
    # color = models.CharField(
    #     max_length=100, verbose_name='color ategory', default='#FFFFFF')

    class meta:
        verbose_name = 'Category Cards'
       # ordering = ['id']

    def __str__(self):
        return self.name

class Cards(models.Model):

    owner = models.ForeignKey(UserModel,on_delete=models.CASCADE,null=True,blank=True)
    categoria = models.ForeignKey(CategoriaCard,on_delete=models.CASCADE,null=True,blank=True)
    cardTitle = models.CharField(max_length=50, verbose_name='Card title')
    cardMeaning = models.CharField(max_length=50, verbose_name='Card meaning')
    cardImage = models.ImageField(verbose_name='Card image', upload_to='cards',null=True, blank=True,)
    imageURL = models.URLField(
       blank=True, verbose_name='Image source')
    class Meta:
        ordering = ["-id"]

    def delete(self, *args, **kwargs):
        self.cardImage.delete()
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.cardTitle

class CategoriaPost(models.Model):
    name = models.CharField(
        max_length=100, null=False, unique=False, verbose_name='Category Post')
    color = models.CharField(
        max_length=100, verbose_name='color ategory', default='#FFFFFF')

    class meta:
        verbose_name = 'Category'
       # ordering = ['id']

    def __str__(self):
        return self.name


class Post(models.Model):
    categoria = models.ForeignKey(
        CategoriaPost, on_delete=models.CASCADE,null=True)
    image = models.FileField(upload_to="PostImage", verbose_name="Post image")
    title = models.CharField(max_length=500, verbose_name="Post title")
  #  intro = models.CharField(max_length=500, verbose_name="Post intro")
    content = models.TextField(blank=True, verbose_name="Post content")
    image_src = models.URLField(
        default=f"http://127.0.0.1:8000/{image}", verbose_name="post image source ")
    # likes = models.IntegerField(default=0, verbose_name="post likes")
    likes = models.ManyToManyField(
        UserModel, verbose_name="Post likes", blank=True)

    likes_count = models.IntegerField(
        default=0, verbose_name="Post likes counter")

 

    def delete(self, *args, **kwargs):
        self.image.delete()
       # os.remove(os.path.join(settings.MEDIA_ROOT, self.image))
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments")
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

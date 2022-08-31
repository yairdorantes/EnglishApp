from distutils.command.upload import upload
from email.policy import default
from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=10, verbose_name='User name')
    email = models.EmailField(verbose_name='User email')
    password = models.CharField(max_length=128, verbose_name='password')

    def __str__(self):
        return self.username


class Cards(models.Model):
    cardTitle = models.CharField(max_length=50, verbose_name='Card title')
    cardMeaning = models.CharField(max_length=50, verbose_name='Card meaning')
    cardImage = models.ImageField(verbose_name='Card image', upload_to='cards')
    imageURL = models.URLField(default=False, verbose_name='Image source')

    def __str__(self):
        return self.cardTitle

# Generated by Django 4.1.1 on 2022-11-16 19:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shortsv2',
            name='user_answered',
        ),
        migrations.DeleteModel(
            name='AnswersForShortsV2',
        ),
        migrations.DeleteModel(
            name='ShortsV2',
        ),
    ]

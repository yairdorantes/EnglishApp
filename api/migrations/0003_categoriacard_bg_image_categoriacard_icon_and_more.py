# Generated by Django 4.1.1 on 2022-11-20 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_shortsv2_user_answered_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='categoriacard',
            name='bg_image',
            field=models.URLField(default='http://127.0.0.1:8000/', verbose_name='background source'),
        ),
        migrations.AddField(
            model_name='categoriacard',
            name='icon',
            field=models.URLField(default='http://127.0.0.1:8000/', verbose_name='icon source'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='PostImage', verbose_name='Post image'),
        ),
    ]

# Generated by Django 4.1.1 on 2022-10-24 04:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_categoriacard_remove_post_intro_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usermodel',
            name='score',
        ),
    ]

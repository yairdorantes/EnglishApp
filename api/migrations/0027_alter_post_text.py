# Generated by Django 4.1.1 on 2022-10-20 20:11

from django.db import migrations
import markdownfield.models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_post_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='text',
            field=markdownfield.models.MarkdownField(default=''),
        ),
    ]

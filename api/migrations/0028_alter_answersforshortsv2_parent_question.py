# Generated by Django 4.1.1 on 2022-10-20 20:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_alter_post_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answersforshortsv2',
            name='parent_question',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='api.shortsv2'),
        ),
    ]
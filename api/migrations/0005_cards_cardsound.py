# Generated by Django 3.2 on 2023-02-09 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_usermodel_premium'),
    ]

    operations = [
        migrations.AddField(
            model_name='cards',
            name='cardSound',
            field=models.CharField(max_length=200, null=True, verbose_name='sound src'),
        ),
    ]

# Generated by Django 3.2 on 2023-02-09 23:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_cards_cardsound'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cards',
            options={'ordering': ['-categoria']},
        ),
    ]
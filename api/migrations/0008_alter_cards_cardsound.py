# Generated by Django 3.2 on 2023-02-09 18:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0007_alter_cards_cardsound"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cards",
            name="cardSound",
            field=models.TextField(blank=True, null=True, verbose_name="Sound Src"),
        ),
    ]
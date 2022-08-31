# Generated by Django 4.0.6 on 2022-08-28 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_cards_alter_user_email_alter_user_password_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cards',
            name='cardImage',
            field=models.ImageField(upload_to='', verbose_name='Card image'),
        ),
        migrations.AlterField(
            model_name='cards',
            name='cardMeaning',
            field=models.CharField(max_length=50, verbose_name='Card meaning'),
        ),
        migrations.AlterField(
            model_name='cards',
            name='cardTitle',
            field=models.CharField(max_length=50, verbose_name='Card title'),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, verbose_name='User email'),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=10, verbose_name='User name'),
        ),
    ]

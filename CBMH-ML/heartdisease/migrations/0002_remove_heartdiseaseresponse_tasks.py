# Generated by Django 3.0.3 on 2020-04-27 09:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('heartdisease', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='heartdiseaseresponse',
            name='tasks',
        ),
    ]
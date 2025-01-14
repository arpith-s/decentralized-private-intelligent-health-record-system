# Generated by Django 3.0.3 on 2020-04-28 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('heartdisease', '0002_remove_heartdiseaseresponse_tasks'),
    ]

    operations = [
        migrations.CreateModel(
            name='HeartDisease',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField(blank=True, default=None, null=True)),
                ('sex', models.IntegerField(blank=True, default=None, null=True)),
                ('cp', models.IntegerField(blank=True, default=None, null=True)),
                ('trestbps', models.IntegerField(blank=True, default=None, null=True)),
                ('chol', models.IntegerField(blank=True, default=None, null=True)),
                ('fbs', models.IntegerField(blank=True, default=None, null=True)),
                ('restecg', models.IntegerField(blank=True, default=None, null=True)),
                ('thalach', models.IntegerField(blank=True, default=None, null=True)),
                ('exang', models.IntegerField(blank=True, default=None, null=True)),
                ('oldpeak', models.FloatField(blank=True, default=None, null=True)),
                ('slope', models.IntegerField(blank=True, default=None, null=True)),
                ('ca', models.IntegerField(blank=True, default=None, null=True)),
                ('thal', models.IntegerField(blank=True, default=None, null=True)),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]

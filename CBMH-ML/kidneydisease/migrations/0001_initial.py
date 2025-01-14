# Generated by Django 3.0.3 on 2020-04-27 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='KidneyDiseaseRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField(blank=True, default=None, null=True)),
                ('bp', models.IntegerField(blank=True, default=None, null=True)),
                ('sg', models.IntegerField(blank=True, default=None, null=True)),
                ('fbs', models.IntegerField(blank=True, default=None, null=True)),
                ('al', models.IntegerField(blank=True, default=None, null=True)),
                ('su', models.IntegerField(blank=True, default=None, null=True)),
                ('rbc', models.FloatField(blank=True, default=None, null=True)),
                ('pc', models.IntegerField(blank=True, default=None, null=True)),
                ('pcc', models.IntegerField(blank=True, default=None, null=True)),
                ('ba', models.IntegerField(blank=True, default=None, null=True)),
                ('bgr', models.IntegerField(blank=True, default=None, null=True)),
                ('bu', models.IntegerField(blank=True, default=None, null=True)),
                ('sc', models.IntegerField(blank=True, default=None, null=True)),
                ('sod', models.IntegerField(blank=True, default=None, null=True)),
                ('pot', models.IntegerField(blank=True, default=None, null=True)),
                ('hemo', models.IntegerField(blank=True, default=None, null=True)),
                ('pcv', models.IntegerField(blank=True, default=None, null=True)),
                ('wc', models.IntegerField(blank=True, default=None, null=True)),
                ('rc', models.IntegerField(blank=True, default=None, null=True)),
                ('htn', models.IntegerField(blank=True, default=None, null=True)),
                ('dm', models.IntegerField(blank=True, default=None, null=True)),
                ('cad', models.IntegerField(blank=True, default=None, null=True)),
                ('appet', models.IntegerField(blank=True, default=None, null=True)),
                ('pe', models.IntegerField(blank=True, default=None, null=True)),
                ('ane', models.IntegerField(blank=True, default=None, null=True)),
                ('prediction', models.CharField(max_length=200)),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='KidneyDiseaseResponse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prediction', models.CharField(max_length=200)),
                ('probability', models.FloatField(blank=True, default=None, null=True)),
                ('error', models.BooleanField()),
                ('error_description', models.CharField(blank=True, max_length=500, null=True)),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]

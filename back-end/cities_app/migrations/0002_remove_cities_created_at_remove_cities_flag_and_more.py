# Generated by Django 5.0.4 on 2024-04-27 01:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cities_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cities',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='cities',
            name='flag',
        ),
        migrations.RemoveField(
            model_name='cities',
            name='updated_at',
        ),
    ]
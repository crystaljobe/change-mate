# Generated by Django 5.0.4 on 2024-04-18 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_app', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_photo',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]

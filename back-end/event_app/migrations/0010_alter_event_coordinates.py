# Generated by Django 5.0.4 on 2024-04-29 15:47

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_app', '0009_event_attendees_needed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='coordinates',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(blank=True, null=True), blank=True, null=True, size=None),
        ),
    ]

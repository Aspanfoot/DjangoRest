# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-15 06:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20170615_0514'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='user_id',
            field=models.PositiveIntegerField(),
        ),
    ]

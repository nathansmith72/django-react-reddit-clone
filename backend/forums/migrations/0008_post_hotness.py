# Generated by Django 3.1.3 on 2020-11-30 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forums', '0007_auto_20201130_1335'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='hotness',
            field=models.IntegerField(default=0),
        ),
    ]

# Generated by Django 3.1.3 on 2020-11-30 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forums', '0009_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.URLField(max_length=500, null=True),
        ),
    ]

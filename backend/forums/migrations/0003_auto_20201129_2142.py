# Generated by Django 3.1.3 on 2020-11-29 21:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forums', '0002_auto_20201129_2118'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='forum',
            new_name='subreddit',
        ),
    ]

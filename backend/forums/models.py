import datetime

from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from mptt.fields import TreeForeignKey

from accounts.models import User


class Subreddit(models.Model):
    name = models.CharField(max_length=20, null=False, blank=False)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Subreddit, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Post(models.Model):
    subreddit = models.ForeignKey(Subreddit, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=512, null=False, blank=False)
    body = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    image = models.URLField(max_length=500, null=True)
    link = models.URLField(max_length=500, null=True)
    ups = models.IntegerField(default=0)
    downs = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    hotness = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        hours_since_post = (datetime.datetime.now() - self.timestamp.replace(tzinfo=None)).total_seconds() / 60 / 60
        self.hotness = round(self.score / hours_since_post)
        super(Post, self).save(*args, **kwargs)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = TreeForeignKey('self', related_name='children', null=True, blank=True, db_index=True,
                            on_delete=models.CASCADE)
    body = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    ups = models.IntegerField(default=0)
    downs = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    controversial_score = models.IntegerField(default=0)

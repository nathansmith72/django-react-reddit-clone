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
    title = models.CharField(max_length=256, null=False, blank=False)
    body = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    ups = models.IntegerField(default=0)
    downs = models.IntegerField(default=0)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.title


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

import datetime

import praw
from celery.app import shared_task
from django.conf import settings

from accounts.models import User
from forums.models import Subreddit, Post


@shared_task
def get_subreddits():
    reddit = praw.Reddit(
        client_id=settings.REDDIT_CLIENT_ID,
        client_secret=settings.REDDIT_SECRET,
        user_agent=settings.REDDIT_USER_AGENT
    )
    for subreddit in Subreddit.objects.all():
        hot_posts = reddit.subreddit(subreddit.name).hot(limit=10)
        for reddit_post in hot_posts:
            user = User.objects.get_or_create(username=reddit_post.author.name)[0]
            post = Post.objects.get_or_create(
                user=user,
                title=reddit_post.title,
                subreddit=subreddit,
            )[0]
            post.timestamp = datetime.datetime.utcfromtimestamp(reddit_post.created_utc)
            post.score = reddit_post.score
            if not reddit_post.is_self:  # We only want to work with link posts
                post.image = reddit_post.url
            post.save()


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
        for post in hot_posts:
            user = User.objects.get_or_create(username=post.author.name)[0]
            Post.objects.get_or_create(
                user=user,
                title=post.title,
                subreddit=subreddit
            )


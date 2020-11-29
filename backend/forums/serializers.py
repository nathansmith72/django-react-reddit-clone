from rest_framework.serializers import ModelSerializer

from accounts.serializers import UserSerializer
from forums.models import Post, Subreddit


class SubredditSerializer(ModelSerializer):
    class Meta:
        model = Subreddit
        fields = "__all__"


class PostSerializer(ModelSerializer):
    subreddit = SubredditSerializer(many=False)
    user = UserSerializer(many=False)

    class Meta:
        model = Post
        fields = "__all__"

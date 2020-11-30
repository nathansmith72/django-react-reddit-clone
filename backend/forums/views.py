from rest_framework import filters
from rest_framework.viewsets import ModelViewSet

from forums.models import Post
from forums.serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['hotness', 'score', 'timestamp']

    def get_queryset(self):
        queryset = Post.objects.all()
        subreddit_slug = self.request.query_params.get('slug', None)
        if subreddit_slug is not None:
            queryset = queryset.filter(subreddit__slug=subreddit_slug)
        return queryset

from django.contrib import admin

from forums.models import Post, Subreddit, Comment


class SubredditAdmin(admin.ModelAdmin):
    pass


class PostAdmin(admin.ModelAdmin):
    pass


class CommentAdmin(admin.ModelAdmin):
    pass


admin.site.register(Subreddit, SubredditAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)

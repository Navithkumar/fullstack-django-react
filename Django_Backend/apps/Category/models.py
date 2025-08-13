from django.db import models
from config.settings.base import AUTH_USER_MODEL

class Category(models.Model):
    class Status(models.IntegerChoices):
        PENDING = 1, 'Pending'
        APPROVED = 2, 'Approved'
        DECLINE = 3, 'Decline'

    user = models.ForeignKey(AUTH_USER_MODEL,
    on_delete=models.SET_NULL,null=True,
    blank=True,related_name='user_id')
    category_name = models.CharField(max_length=255)
    category_image = models.FileField(upload_to='static/category_image')
    status = models.IntegerField(choices=Status.choices,default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.category_name

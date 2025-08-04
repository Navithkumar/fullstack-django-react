from django.db import models
from config.settings.base import AUTH_USER_MODEL

class Category(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL,
    on_delete=models.SET_NULL,null=True,
    blank=True,related_name='user_id')
    category_name = models.CharField(max_length=255)
    category_image = models.FileField(upload_to='static/category_image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.category_name

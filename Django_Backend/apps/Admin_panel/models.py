from django.db import models

# Create your models here.

class Admin_Slidebar(models.Model):
    class status(models.IntegerChoices):
        ACTIVE = 1, 'active'
        INACTIVE = 2, 'inactive'

    slidebar_name = models.CharField(max_length=255)
    status = models.IntegerField(choices=status.choices)
    icons = models.CharField(max_length=255)
    role = models.TextField()
    link = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.slidebar_name}"
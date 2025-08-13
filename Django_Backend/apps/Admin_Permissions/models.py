from django.db import models
from apps.Category.models import Category
from config.settings.base import AUTH_USER_MODEL
# Create your models here.


class Permissions(models.Model):
  class Status(models.IntegerChoices):
      PENDING = 1, 'Pending'
      APPROVED = 2, 'Approved'
      DECLINE = 3, 'Decline'

  name = models.CharField(max_length=255)
  user = models.ForeignKey(AUTH_USER_MODEL,
    on_delete=models.SET_NULL,null=True,
    blank=True,related_name='user')
  category = models.ForeignKey(
      Category,
      on_delete=models.CASCADE,
      null=True,
      blank=True,
      related_name='permissions'
  )
  status = models.IntegerField(choices=Status.choices,default=1)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def __str__(self):
        return self.name
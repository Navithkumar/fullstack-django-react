from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Category
from apps.Admin_Permissions.models import Permissions

@receiver(post_save, sender=Category)
def category_created_handler(sender, instance, created, **kwargs):
    if created:

        Permissions.objects.create(
            name=f"Permission for {instance.category_name}",
            category=instance,
            status=Permissions.Status.PENDING,
            user=instance.user,
        )

# @receiver(post_save, sender=Permissions)
# def Permission_update_handler(sender, instance, created, **kwargs):
#     if instance.category:
#         print("111")

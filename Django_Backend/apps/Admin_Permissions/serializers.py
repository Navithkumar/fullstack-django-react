from dataclasses import fields
from rest_framework import serializers
from .models import Permissions


class AdminPermissionsSerilizers(serializers.ModelSerializer):
  class Meta:
    model = Permissions
    fields = "__all__"
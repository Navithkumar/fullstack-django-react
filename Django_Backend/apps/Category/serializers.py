from dataclasses import fields
from rest_framework import serializers
from .models import Category


class CategorySerilizers(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = "__all__"
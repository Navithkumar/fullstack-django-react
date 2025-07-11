from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Admin_Slidebar

class AdminPanelSerilizers(serializers.ModelSerializer):
  class Meta:
    model=Admin_Slidebar
    fields='__all__'
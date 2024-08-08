from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usersnew

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usersnew
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_admin', 'created_at', 'updated_at']
       

    

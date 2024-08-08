# admin.py

from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number', 'status', 'created_at')
    search_fields = ('name', 'email', 'phone_number', 'status')
    list_filter = ('status', 'created_at')

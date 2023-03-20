from django.contrib import admin
from chart.models import Order
# Register your models here.

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order', 'delivery_time', 'status']
    list_filter = ['created_date','status']
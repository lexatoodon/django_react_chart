from rest_framework import serializers
from chart.models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order','delivery_time', 'price_dollar', 'price_ruble', 'created_date']
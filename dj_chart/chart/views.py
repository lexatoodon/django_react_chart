from django.shortcuts import render
from rest_framework.generics import ListAPIView
from chart.models import Order
from chart.serializers import OrderSerializer

class OrderListAPIView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class FinishedOrderAPIView(ListAPIView):
    queryset = Order.objects.filter(status = True)
    serializer_class = OrderSerializer

class NotFinishedOrderAPIView(ListAPIView):
    queryset = Order.objects.filter(status = False)
    serializer_class = OrderSerializer
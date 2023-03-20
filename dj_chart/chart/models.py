from django.db import models
from django.utils import timezone

class Order(models.Model):
    order = models.BigIntegerField(unique = True)
    price_dollar = models.IntegerField(null = False)
    price_ruble = models.FloatField(null = False)
    delivery_time = models.DateField()
    status = models.BooleanField(default = False)
    created_date = models.DateField(auto_now = True)

    def __str__(self) -> str:
        return str(self.order)
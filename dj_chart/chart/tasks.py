from celery import shared_task
from chart.google_api import getValues
from chart.models import Order
from operator import itemgetter
from datetime import date
from telebot import TeleBot
from django.conf import settings

@shared_task
def insertValues():
    values = getValues()
    if values != None:
        objs = [Order(
            order=value[0], 
            price_dollar = value[1], 
            price_ruble = value[2], 
            delivery_time = '-'.join(itemgetter(2,1,0)(value[3].split('.'))),
            status = value[4],
            ) for value in values]
        Order.objects.bulk_create(objs, ignore_conflicts=True)

@shared_task
def send_expire_notification_telegram():
    values = list(Order.objects.all().values('order', 'delivery_time'))
    expired_orders = [value['order'] for value in values if value['delivery_time'] <= date.today()]
    if expired_orders:
        message = 'List of expired orders: '
        orders = ', '.join([str(o) for o in expired_orders])
        bot = TeleBot(settings.TELEGRAM_TOKEN)
        bot.send_message(settings.CHAT_ID ,text=message+orders)
    

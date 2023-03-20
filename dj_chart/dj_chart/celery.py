import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dj_chart.settings')

app = Celery('dj_chart')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
app.conf.timezone = 'UTC'
app.conf.beat_schedule = {
    'send-telegram-notification-every-day-at-00:05': {
        'task': 'chart.tasks.send_expire_notification_telegram',
        'schedule': crontab(minute='5', hour='0')
    },
    'get_values-from-google-sheet':{
        'task':'chart.tasks.insertValues',
        'schedule': crontab(minute='*/5')
    }
}

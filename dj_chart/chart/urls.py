from django.urls import path
from chart import views

app_name = 'chart'

urlpatterns = [
    path('api/', views.OrderListAPIView.as_view(), name = 'all_orders'),
    path('api/finished/', views.FinishedOrderAPIView.as_view(), name = 'finished_orders'),
    path('api/unfinished/', views.NotFinishedOrderAPIView.as_view(), name = 'not_finished_orders')
]

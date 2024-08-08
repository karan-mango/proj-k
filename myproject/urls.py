from django.urls import path
from login.views import login_view,create_user
from leads.views import lead_detail,lead_list,lead_search
from django.contrib import admin


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('login/', login_view,name='login'), 

    path('leads/', lead_list, name='lead-list'),
    path('leads/<int:pk>/', lead_detail, name='lead-detail'),
    path('leads/search/', lead_search, name='lead-search'),

    path('create_user/', create_user, name='create_user'),

   
]

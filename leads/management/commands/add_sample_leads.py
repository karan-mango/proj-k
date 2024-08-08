from django.core.management.base import BaseCommand
from leads.models import Lead
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Add sample leads data to the database'

    def handle(self, *args, **kwargs):
        fake = Faker()
        phone_numbers = [
            '1234567890', '2345678901', '3456789012', '4567890123', '5678901234',
            '6789012345', '7890123456', '8901234567', '9012345678', '0123456789'
        ]
        
        for _ in range(50):
            Lead.objects.create(
                name=fake.name(),
                email=fake.email(),
                phone_number=random.choice(phone_numbers),
                status=random.choice(['New', 'Contacted', 'Converted', 'Lost']),
                created_at=fake.date_time_this_year()
            )
        self.stdout.write(self.style.SUCCESS('Successfully added sample leads data'))

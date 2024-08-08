from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

class Usersnew(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def save(self, *args, **kwargs):
        if not self.pk:  # If the object is being created
            self.created_at = timezone.now()  # Set the created_at timestamp
            self.password = make_password(self.password)  # Hash the password
        else:  # If the object is being updated
            self.updated_at = timezone.now()  # Update the updated_at timestamp
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def get_dirty_fields(self):
        """
        Returns a dictionary containing the fields that have been changed from
        their initial values.
        """
        if not self.pk:
            return self.__dict__
        db_instance = type(self).objects.get(pk=self.pk)
        return {field: value for field, value in self.__dict__.items() if getattr(db_instance, field) != value}

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['username']

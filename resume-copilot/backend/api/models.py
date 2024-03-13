import hashlib
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    password_hash = models.CharField(max_length=64)

    def set_password(self, password):
        self.password_hash = hashlib.sha256(password.encode()).hexdigest()

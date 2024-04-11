from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    token = models.CharField(max_length=512)  # Assuming the token needs to be stored

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)

class Resume(models.Model):
    job = models.ForeignKey(Job, related_name='resumes', on_delete=models.CASCADE)
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

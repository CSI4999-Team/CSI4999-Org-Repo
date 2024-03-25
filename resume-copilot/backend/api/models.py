from django.db import models

class ResumeRecommendation(models.Model):
    user_id = models.CharField(max_length=200)
    resume = models.TextField()
    recommendation = models.TextField()
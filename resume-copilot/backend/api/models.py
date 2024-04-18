from django.db import models

class UserData(models.Model):
    auth0_id = models.CharField(max_length=512)  # Auth0 user token as a unique identifier
    job_description = models.TextField()  # Store job descriptions
    resume_text = models.TextField()  # Store resume text
    recommendation_text = models.TextField()  # Store resume text
    created_at = models.DateTimeField()
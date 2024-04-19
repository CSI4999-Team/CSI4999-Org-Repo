from django import forms
from .models import UserData

class UserDataForm(forms.ModelForm):
    class Meta:
        model = UserData
        fields = ['auth0_id', 'job_description', 'resume_text', 'recommendation_text']
        exclude = ['created_at']

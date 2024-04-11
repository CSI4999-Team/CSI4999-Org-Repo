from django import forms
from .models import Job, Resume, User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'email', 'token']

class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['title', 'description']

class ResumeForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['file']

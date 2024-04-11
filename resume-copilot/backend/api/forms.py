from django import forms
from .models import Job, Resume

class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['title', 'description']

class ResumeForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['file']

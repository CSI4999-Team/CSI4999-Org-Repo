from django.shortcuts import render

# Create your views here.
# API to talk to OpenAI GPT 3.5 / 4

from django.http import JsonResponse
import requests

def chatgpt_view(request):
    # Sending data via GET for simplicity for now 
    # Later, we should consider using POST with proper data validation and security measures
    # TODO: Make into a POST request or something RESTful?
    user_input = request.GET.get('query', '')

    response = requests.post(
        "https://api.openai.com/v4/completions",
        headers={
            "Authorization": "Bearer YOUR_OPENAI_API_KEY",
            "Content-Type": "application/json",
        },
        json={
            "model": "text-davinci-003",  # Specify the model you're using
            "prompt": user_input,
            "temperature": 0.5,
            "max_tokens": 50,
        }
    )
    
    if response.status_code == 200:
        return JsonResponse(response.json(), safe=False)
    else:
        return JsonResponse({'error': 'Failed to fetch response from OpenAI'}, status=500)

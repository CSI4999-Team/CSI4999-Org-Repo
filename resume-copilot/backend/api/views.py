from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import openai
import fitz  # PyMuPDF for PDF processing
from utils.vault_util import *

def my_view(request):
    return HttpResponse("This is a test response.")

def get_openai_api_key():
    hcp_api_token = get_hcp_api_token()
    secret_data = read_secret_from_vault(hcp_api_token)
    return get_secrets(secret_data, "OPENAI_API_KEY")

openai.api_key = get_openai_api_key()

@csrf_exempt
def process_pdf(request):
    if request.method == 'POST' and request.FILES.get('file'):
        pdf_file = request.FILES['file']

        # Read PDF content
        doc = fitz.open(stream=pdf_file.read(), filetype='pdf')
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()

        try:
            # The updated API call as per the new interface
            openai_response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": text}
                ]
            )
            response_text = openai_response.choices[0].message.content if openai_response.choices else "No response"
            return JsonResponse({'response': response_text})

        except openai.RateLimitError:
            return JsonResponse({'error': 'Rate limit exceeded. Please try again later.'}, status=429)
        except openai.OpenAIError as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return HttpResponse("Invalid request", status=400)

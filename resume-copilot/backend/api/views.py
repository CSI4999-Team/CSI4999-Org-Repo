from urllib import response
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import openai
import os
import fitz  # PyMuPDF for PDF processing
from utils.vault_util import *

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

def get_openai_api_key():
    hcp_api_token = get_hcp_api_token()
    secret_data = read_secret_from_vault(hcp_api_token)
    return get_secrets(secret_data, "OPENAI_API_KEY")

# Retrieve API key from environment variables
openai_api_key = os.getenv("OPENAI_API_KEY")

# TODO: Figure out why Vault version doesnt get stored AT ALL :(
#openai.api_key = get_openai_api_key()

@csrf_exempt
def parse_pdf(request):
    if request.method == 'POST' and request.FILES.get('file'):
        pdf_file = request.FILES['file']

        # Read PDF content
        doc = fitz.open(stream=pdf_file.read(), filetype='pdf')
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()

        # Return the extracted text as a response
        return JsonResponse({'extracted_text': text})
    else:
        return HttpResponse("Invalid request", status=400)
    
# Initialize OpenAI client with the API key
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@csrf_exempt
def analyze_resume(request):
    if request.method == 'POST':
        try:
            user_message = request.POST.get('user_message', '')  # Get the user message from the request body

            # Make a single request to the OpenAI API using the user message
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": user_message,
                    }
                ],
                model="gpt-3.5-turbo",
            )

            # Ensure the response is in text format
            response_text = chat_completion.choices[0].message.content.strip()

            return JsonResponse({'response': response_text})
        except openai.RateLimitError:
            return JsonResponse({'error': 'Rate limit exceeded. Please try again later.'}, status=429)
        except openai.OpenAIError as e:
            return JsonResponse({'error': str(e)}, status=500)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)

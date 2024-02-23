from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import openai
import fitz  # PyMuPDF for PDF processing
from utils.vault_util import *

def get_openai_api_key():
    hcp_api_token = get_hcp_api_token()
    secret_data = read_secret_from_vault(hcp_api_token)
    return get_secrets(secret_data, "OPENAI_API_KEY")

openai.api_key = get_openai_api_key()

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
    
@csrf_exempt
def analyze_resume(request):
    if request.method == 'POST':
        try:
            resume_text = request.POST.get('resume_text', '')  # Get the resume text from the request

            # Make a request to the OpenAI API using the resume text
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=f"Analyze this resume: {resume_text}",
                max_tokens=150
            )

            return JsonResponse({'feedback': response.choices[0].text.strip()})
        except openai.RateLimitError:
            return JsonResponse({'error': 'Rate limit exceeded. Please try again later.'}, status=429)
        except openai.OpenAIError as e:
            logger.error(f"An OpenAI API error occurred: {e}")
            return JsonResponse({'error': str(e)}, status=500)
        except Exception as e:
            logger.error(f"An unexpected error occurred: {e}")
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
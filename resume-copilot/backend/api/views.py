import json
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
        # Store the extracted text in the session or another storage
        request.session['resume_text'] = text  # Example using Django session
        request.session.save()  # Explicitly save the session
        
        return JsonResponse({'extracted_text': text})
    else:
        return HttpResponse("Invalid request", status=400)
    
# Initialize OpenAI client with the API key
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@csrf_exempt
def analyze_resume(request):
    if request.method == 'POST':
        try:
            # Retrieve the resume text from the session or other storage
            data = json.loads(request.body)  # Correctly load the JSON data sent from the frontend
            resume_text = data.get('resume_text', '')  # Access the resume_text directly from the loaded JSON
            user_message = data.get('user_message', '')  # Assuming you want to pass this from frontend as well

            confirm_skip = data.get('confirm_skip', False) # Default to False if not provided
            job_desc = data.get('job_desc', '')

            if confirm_skip:
                # If user chooses to skip, assign a custom prompt to job_description
                job_description = "The user has not provided a specific job description and has opted for general feedback. Please begin your expert response with 'Having opted for general feedback, ...'"
            else:
                # Otherwise, use the provided job description
                job_description = job_desc
                
            # Make a single request to the OpenAI API using the user message
            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are Resume Co-Pilot. Please take on the role of an expert resume feedback AI-agent familiar with all knowledge pertaining to a hiring manager and professional technical recruiter for [insert user's company they are applying to]. Please provide some tailored feedback for the candidate's resume, suggestions that could better align the resume to the role, a rating on a score of 100 based on your experience as a recruiter and hiring manger compared to other potential candidates, etc. I will first provide the user's parsed resume, followed by the users job description, if stated. Otherwise, there will be a generic feedback message."},
                    {"role": "user", "content": resume_text},  # Resume text as context
                    {"role": "user", "content": job_description}
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

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import openai
import os
import fitz  # PyMuPDF
from fpdf import FPDF

# Set path otherwise error :(
import sys
sys.path.append("/Users/matthew/Desktop/CSI4999-Org-Repo/resume-copilot/backend")

# Import Secret Functions from Vault
from utils.vault_util import *


# Function to get OpenAI API key from Vault
def get_openai_api_key():
    hcp_api_token = get_hcp_api_token()
    secret_data = read_secret_from_vault(hcp_api_token)
    return get_secrets(secret_data, "OPENAI_API_KEY")  # Replace with the actual secret name

# Retrieve API key from environment variables
openai.api_key = get_openai_api_key()

# Hardcoded PDF file path
pdf_path = r"PATH TO RESUME FOR GPT TO REVIEW"
    
# Read PDF content
doc = fitz.open(pdf_path)
text = "Evaluate the resume."
for page in doc:
    text += page.get_text()
doc.close()
    
try:
    # The updated API call as per the new interface
    openai_response = openai.chat.completions.create(
        model="gpt-3.5-turbo",  # Use the model identifier suitable for your needs, "gpt-3.5-turbo" as an example
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": text}
        ]
    )
    response_text = openai_response.choices[0].message.content if openai_response.choices else "No response"
    class PDF(FPDF):
        def header(self):
            self.add_font('DejaVu', '', r'PATH TO TTF FILE - TEMP', uni=True)
            self.set_font('DejaVu', '', 12)
            self.cell(0, 10, 'GPT Response', 0, 1, 'C')

        def footer(self):
            self.set_y(-15)
            self.set_font('DejaVu', '', 8)
            self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    # After getting the response
    pdf = PDF()
    pdf.add_page()
    pdf.add_font('DejaVu', '', 'DejaVuSansCondensed.ttf', uni=True)
    pdf.set_font('DejaVu', '', 12)
    pdf.multi_cell(0, 10, response_text)

    pdf_output_path = r"PUT PATH TO HAVE PDF OUTPUT HERE"
    pdf.output(pdf_output_path)

    print(f"PDF generated: {pdf_output_path}")

except openai.RateLimitError:
    print("Rate limit exceeded. Please try again later.")
except openai.OpenAIError as e:
    print(f"An OpenAI API error occurred: {e}")
except openai.OpenAIError as e:
    print(f"An OpenAI API error occurred: {e}")


from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import openai
import os
import fitz  # PyMuPDF
from fpdf import FPDF

# Retrieve API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")
# Hardcoded PDF file path
pdf_path = r"C:\Users\Jacob\OneDrive - oakland.edu\Documents\Desktop\Jacob Souro New Resume 2024.pdf"
    
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
            self.add_font('DejaVu', '', r'C:\Users\Jacob\CSI4999-Org-Repo\resume-copilot\backend\api\DejaVuSansCondensed.ttf', uni=True)
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

    pdf_output_path = r"C:\Users\Jacob\OneDrive - oakland.edu\Documents\Desktop\GPT_Response.pdf"
    pdf.output(pdf_output_path)

    print(f"PDF generated: {pdf_output_path}")

except openai.RateLimitError:
    print("Rate limit exceeded. Please try again later.")
except openai.OpenAIError as e:
    print(f"An OpenAI API error occurred: {e}")
except openai.OpenAIError as e:
    print(f"An OpenAI API error occurred: {e}")


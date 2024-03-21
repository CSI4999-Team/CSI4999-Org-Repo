import os
from docx import Document
import PyPDF2

def get_file_extension(path):
    _, extension = os.path.splitext(path)
    return extension

def read_resume(resume):
    file_extension = resume.name.split('.')[-1].lower()

    if file_extension == 'pdf':
        text_content = ""
        with resume.open() as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text_content += page.extract_text() 
        return text_content

    elif file_extension == 'docx':
        with resume.open() as file:
            doc = Document(file)
            text_content = ""
            for paragraph in doc.paragraphs:
                text_content += paragraph.text + "\n"
        return text_content
            
    else:
        return None

def readResume(request):
    if request.method == 'POST':
        resume = request.FILES.get('formData')
        
        try:
            extracted_text = readResume(resume)
            return JsonResponse({'extracted_text': extracted_text})
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    else:
        return JsonResponse({'error': 'POST method required'}, status=400)

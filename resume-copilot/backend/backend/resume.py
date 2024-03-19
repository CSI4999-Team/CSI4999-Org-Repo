import os
from docx import Document
import PyPDF2

def get_file_extension(path):
    _, extension = os.path.splitext(path)
    return extension

def readResume(path):
    extension = get_file_extension(path)
    if extension == '.pdf':
        text_content = ""
        with open(path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text_content += page.extract_text() 
        return text_content

    elif extension == '.docx':
        doc = Document(path)
        text_content = ""
        for paragraph in doc.paragraphs:
            text_content += paragraph.text + "\n"
        return text_content
            
    else:
        return None

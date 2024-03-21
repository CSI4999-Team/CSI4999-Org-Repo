from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from time import sleep
import time
from urllib.parse import urlparse
import json
from django.http import JsonResponse

chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

def signal_handler(sig, frame):
    driver.quit()
    sys.exit(0)

def get_domain_name(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    if domain.startswith("www."):
        domain = domain[4:]  # Remove 'www.' prefix if present
    return domain

def scrapeWebsiteCategories(url):

    supportedSites = { 
        "indeed.com": {
            "title": ".jobsearch-JobInfoHeader-title",
            "company": '[data-testid="jobsearch-CompanyInfoContainer"] [data-company-name="true"]',
            "qualifications": None
        },
        "ziprecruiter.com": {
            "title": ".job_title",
            "company": ".hiring_company",
            "qualifications": None
        },
        "linkedin.com": {
            "title": ".job-details-jobs-unified-top-card__job-title-link",
            "company": None,
            "qualifications": None
        }
    }

    driver.get(url)
    allText = driver.find_element(By.CSS_SELECTOR, "body").text

    data = {
        "title": None,
        "company": None,
        "qualifications": None,
        "all": allText
    }

    domain = get_domain_name(url)
    if domain in supportedSites:
        site_details = supportedSites[domain]
        for field, selector in site_details.items():
            if selector:
                try:
                    value = driver.find_element(By.CSS_SELECTOR, selector).text
                    data[field] = value
                except NoSuchElementException:
                    pass 

    return data

def scrapeWebsiteContent(url):
    driver.get(url)
    return driver.find_element(By.CSS_SELECTOR, "body").text

def scrapeWebsite(request):
    if request.method == 'POST':
        url = request.POST.get('url')
        
        try:
            extracted_text = scrapeWebsiteContent(url)
            return JsonResponse({'extracted_text': extracted_text})
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    else:
        return JsonResponse({'error': 'POST method required'}, status=400)

# Resume Co-Pilot

**Resume Co-Pilot** is an AI-driven tool designed to empower job seekers by enhancing their resume writing process. Utilizing advanced Generative AI, this project aims to address the challenges of navigating through automated Applicant Tracking Systems (ATS) and optimizing resumes for specific job applications.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:
*   Node.js and npm (for React frontend)
*   Python and Django (for Django backend)

### Installing

* To run locally: ```git clone https://github.com/CSI4999-Team/CSI4999-Org-Repo.git```
* ```cd resume-copilot```

 **We need to create a .env file to store secrets for Auth0 to pull!**
 ***TODO: This should be taken care of in the future with Vault Agent***
 * Inside the resume-copilot "root" folder, create a .env file, inside it copy paste:
 ```REACT_APP_AUTH0_DOMAIN = "INSERT_SECRET_HERE"```
 ```REACT_APP_AUTH0_CLIENT_ID = "INSERT_SECRET_HERE"```

* This will run the frontend on http://localhost:3000:

 ```npm install``` 

 ```npm install react-markdown```

 ```npm install react-transition-group```

 ```npm install @auth0/auth0-react```

 ```npm install react-router-dom@6```

 ```npm start```

* To activate the Django backend, which will run on http://127.0.0.1:8000:

***stay in cd resume-copilot folder to create venv***

 ```python -m venv venv```

***On Linux/MacOS use*** ```source venv/bin/activate``` 

***On Windows use*** `venv\Scripts\activate`

 ```pip install -r requirements.txt```

 ```cd backend```

 **We need to create a .env file to store secrets for Vault to pull!**
 ***TODO: This should be taken care of in the future with Vault Agent***
 * Inside the backend folder, create a .env file, inside it copy paste:
 ```HCP_CLIENT_ID = "INSERT_SECRET_HERE"```
 ```HCP_CLIENT_SECRET = "INSERT_SECRET_HERE"```

 **We can now run the backend server**

 ```python manage.py runserver```

**If you encounter errors:**
* Run ```python where```
* Copy the python pathing and click the drop down from the top that says "Enter interpreter path..."
* Paste and hit enter
* Restart your venv, going to source venv/bin/activate (linux example) (remember you need to be inside the resume-copilot folder)

## Deployment

TODO: Add additional notes about how to deploy this on a production system

### Changes Required to run in Production:

#### Change #1: resume-copilot/backend/backend/settings.py

* Change DEBUG = True -> DEBUG = False

* ALLOWED_HOSTS = ['*'] ->  

ALLOWED_HOSTS = ['resumecopilot.us', 'www.resumecopilot.us', 'resume-copilot-app-l4o8t.ondigitalocean.app', '104.131.187.171', 'api.resumecopilot.us']

* CORS_ALLOW_ALL_ORIGINS = True ->

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Allow local development
    "https://resumecopilot.us",
    "https://www.resumecopilot.us",
    "https://resume-copilot-app-l4o8t.ondigitalocean.app",  # Your React app's domain
]

#### Change #2: resume-copilot/src/components/UploadForm.js

* const parseResponse = await fetch("http://localhost:8000/api/parse_pdf/", { ... ->

const parseResponse = await fetch("https://api.resumecopilot.us/api/parse_pdf/", { ...

* const analyzeResponse = await fetch("http://localhost:8000/api/analyze_resume/", { ... ->

const analyzeResponse = await fetch("https://api.resumecopilot.us/api/analyze_resume/", {

## Built With

* [React](https://reactjs.org/) - Web framework used for the frontend
* [Django](https://www.djangoproject.com/) - Web framework used for the backend

## Versioning

TODO: Explain an versioning if needed

## Authors

* **Your Name** - *Initial work* - [YourUsername](link to your GitHub profile)

See also the list of [contributors](link to contributors graph) who participated in this project.

## License

TODO: Add if needed - This project is licensed under the [LICENSE NAME] License - see the [LICENSE.md](link to license) file for details

## Acknowledgments

* Acknowledgements to anyone whose code was used
* Inspiration
* etc
>>>>>>> main

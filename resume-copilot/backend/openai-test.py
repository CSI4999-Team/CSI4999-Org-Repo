import openai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Retrieve API key from environment variables
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client with the API key
client = openai.OpenAI(api_key=openai_api_key)

try:
    # Make a single request to the OpenAI API
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Say this is a test",
            }
        ],
        model="gpt-3.5-turbo",
    )
    print(chat_completion)
except openai.RateLimitError:
    print("Rate limit exceeded. Please try again later.")
except openai.OpenAIError as e:
    print(f"An OpenAI API error occurred: {e}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
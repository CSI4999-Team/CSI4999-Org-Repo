import openai
import os
from dotenv import load_dotenv

# Define Client
client = OpenAI()

# Load API Token from the .env file
load_dotenv()

# Take the OPENAI_API_KEY from .env
openai.api_key = os.getenv("OPENAI_API_KEY")

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

print(completion.choices[0].message)
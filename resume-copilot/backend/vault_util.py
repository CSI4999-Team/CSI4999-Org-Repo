import os
import requests
from dotenv import load_dotenv

def get_hcp_api_token():
    load_dotenv()

    hcp_client_id = os.getenv("HCP_CLIENT_ID")
    hcp_client_secret = os.getenv("HCP_CLIENT_SECRET")

    print("Requesting HCP API token...")

    token_url = 'https://auth.hashicorp.com/oauth/token'
    payload = {
        "audience": "https://api.hashicorp.cloud",
        "grant_type": "client_credentials",
        "client_id": hcp_client_id,
        "client_secret": hcp_client_secret
    }

    response = requests.post(token_url, json=payload)

# TODO: Convert to Vault Agent rather than using .env file locally
# For now, ensure in backend you have a .env file that contains HCP_CLIENT_ID and HCP_CLIENT_SECRET as found in Vault for the OpenAI token
    if response.status_code == 200:
        print("HCP API token obtained successfully.")
        return response.json().get('access_token')
    else:
        print(f"Failed to get HCP API token. Status code: {response.status_code}")
        exit()

def read_secret_from_vault(hcp_api_token):
    secret_path = "organizations/c3f0f3a4-480e-49f3-b904-1723b0387ae0/projects/e047f9d4-8f1a-411f-9d22-c027242bfbd1/apps/OpenAI-API-Key/open"
    secrets_url = f"https://api.cloud.hashicorp.com/secrets/2023-06-13/{secret_path}"

    print("Requesting secret from HCP Vault...")

    headers = {"Authorization": f"Bearer {hcp_api_token}"}
    response = requests.get(secrets_url, headers=headers)

    if response.status_code == 200:
        print("Secret retrieved successfully from HCP Vault.")
        return response.json()
    else:
        print(f"Failed to read secret from HCP Vault. Status code: {response.status_code}")
        exit()

if __name__ == "__main__":
    # Generate the API token
    hcp_api_token = get_hcp_api_token()
    
    # Read the secret using the obtained token
    secret_data = read_secret_from_vault(hcp_api_token)
    
    # Assuming the secret data contains JSON that can be printed directly
    # Adjust the print statement according to the structure of your secret data
    # TODO: Remove from Production
    print("Secret Data:", secret_data)

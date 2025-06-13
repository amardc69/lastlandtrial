import requests

BASE_URL = "http://localhost:4000"

def get_example():
    """Send a GET request with some query params."""
    params = {"action": "greet", "name": "Alice"}
    resp = requests.get(f"{BASE_URL}/", params=params)
    resp.raise_for_status()
    print("GET response:", resp.json())

def post_temperature_example():
    """Send a POST request with a JSON body."""
    payload = {"temperature": 27.5}
    resp = requests.post(f"{BASE_URL}/measure", json=payload)
    resp.raise_for_status()
    print("POST response:", resp.json())

if __name__ == "__main__":
    try:
        get_example()
        post_temperature_example()
    except requests.exceptions.RequestException as e:
        print("Request failed:", e)

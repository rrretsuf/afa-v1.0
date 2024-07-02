from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")

client = OpenAI(api_key=api_key)

@app.route('/api/query', methods=['POST'])
def handle_query():
    try:
        data = request.get_json()
        print(f"Received data: {data}")

        if not data:
            raise ValueError("No data received")
        
        query = data.get('query')
        print(f"Received query: {query}")
        
        if not query:
            raise ValueError("Query is missing")
        
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Be a helpful assistant"},
                {"role": "user", "content": query}
            ]
        )

        result = completion.choices[0].message.content
        
        cleaned_result = result.strip().strip('`').strip('html')
        
        print(f"Cleaned OpenAI response: {cleaned_result}")
        
        return jsonify(response=cleaned_result)
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


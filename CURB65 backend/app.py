from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/calculate_curb65', methods=['POST'])
def calculate_curb65():
    try:
        # Parse request data
        data = request.json
        print(request.json)
        patient_id = data.get('patientId')
        date_of_birth = datetime.strptime(data.get('dateOfBirth'), '%Y-%m-%d')
        date_of_visit = datetime.strptime(data.get('dateOfVisit'), '%Y-%m-%d')
        age = calculate_age(date_of_birth, date_of_visit) 

 

        score = 0
        score += 1 if data.get('confusion') == 'Yes' else 0
        score += 1 if data.get('urea') == 'Yes' else 0
        score += 1 if data.get('respiratoryRate') == 'Yes' else 0
        score += 1 if data.get('systolicBp') == 'Yes' else 0
        score += 1 if data.get('diastolicBp') == 'Yes' else 0
        score += 1 if data.get('Age65') == 'Yes' else 0

        # Calculate CURB-65 score
        # For demonstration, let's assume a simple calculation here
        curb65_score = calculate_curb65_score(age, score)

        return jsonify({'CURB65Score': curb65_score})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def calculate_age(birth_date, visit_date):
    age = visit_date.year - birth_date.year - ((visit_date.month, visit_date.day) < (birth_date.month, birth_date.day))
    return age

def calculate_curb65_score(age, score):
    # Perform actual CURB-65 score calculation
    # This is just a placeholder function
    # For simplicity, let's return age as the score
    return age, score

if __name__ == '__main__':
    app.run(debug=True)

from flask import Blueprint, render_template, request, redirect, url_for
import requests
import re
from werkzeug.security import generate_password_hash

# API Base URL:

API_BASE_URL = 'http://your.api.base.url'

# ______________Functions_________________

# Check if email is valid:

def is_valid_email(email):
    pattern = re.compile(r"[^@]+@[^@]+\.[^@]+")
    return bool(re.match(pattern, email))

# Check if password is valid:

def is_valid_password(password):
    # Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    pattern = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')
    return bool(re.match(pattern, password))


user_routes_bp = Blueprint('user_routes', __name__)

#______________Routes_________________

# Login:

@user_routes_bp.route('/logIn', methods=['GET', 'POST'])
def logIn():
    
    error_message = None

    if request.method == 'POST':
        
        email = request.form['email']
        password = request.form['password']

        if not is_valid_email(email):
            error_message = 'Invalid email format'
        elif not is_valid_password(password):
            error_message = 'Password must be minimum 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        else:
            login_data = {'email': email, 'password': password}
            login_response = requests.post(f'{API_BASE_URL}/login', json=login_data)
            if login_response.status_code == 200:
                return redirect(url_for('success'))
            else:
                error_message = 'Invalid credentials'

    return render_template('logIn.html', error_message=error_message)

# Forgot Password:

@user_routes_bp.route('/forgotPass', methods=['GET', 'POST'])
def forgotPass():
    
    error_message = None

    if request.method == 'POST':
        
        email = request.form['email']

        if not is_valid_email(email):
            error_message = 'Invalid email format'
        else:
            email_data = {'email': email}
            email_response = requests.post(f'{API_BASE_URL}/forgotPass', json=email_data)
            if email_response.status_code == 200:
                return redirect(url_for('success'))
            else:
                error_message = 'Invalid credentials'

    return render_template('forgotPass.html', error_message=error_message)

# Register:

@user_routes_bp.route('/register', methods=['GET', 'POST'])
def register():
    
    success_message = None
    error_message = None
    
    if request.method == 'POST':
        
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        repeat_password = request.form['repeatPassword']

        if not is_valid_email(email):
            error_message = 'Invalid email format'
        elif not is_valid_password(password):
            error_message = 'Password must be minimum 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        elif password != repeat_password:
            error_message = 'Passwords do not match'
        else:
            hashed_password = generate_password_hash(password)
            register_data = {'name': name, 'email': email, 'password': hashed_password}
            register_response = requests.post(f'{API_BASE_URL}/register', json=register_data)

            if register_response.status_code == 201:
                success_message = 'Registration successful'
            else:
                error_message = 'Registration failed'

    return render_template('register.html', success_message=success_message, error_message=error_message)

# Index:

@user_routes_bp.route('/')
def index():
    return render_template('index.html')
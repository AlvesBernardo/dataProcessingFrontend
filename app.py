from flask import Flask
from routes.user_routes import user_routes_bp

app = Flask(__name__)


app.register_blueprint(user_routes_bp, url_prefix='/logIn', name='logIn')
app.register_blueprint(user_routes_bp, url_prefix='/forgotPass', name='forgotPass')
app.register_blueprint(user_routes_bp, url_prefix='/register', name='register')
app.register_blueprint(user_routes_bp, url_prefix='/', name='index')


if __name__ == '__main__':
    app.run(debug=True)
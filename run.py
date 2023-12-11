from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/logIn')
def logIn():
    return render_template('logIn.html')

@app.route('/forgotPass')
def forgotPass():
    return render_template('forgotPass.html')

if __name__ == '__main__':
    app.run(debug=True)
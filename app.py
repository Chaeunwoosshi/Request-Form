from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

# Route to display the form
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submission
@app.route('/submit-request', methods=['POST'])
def submit_request():
    name = request.form['name']
    email = request.form['email']
    request_type = request.form['type']
    title = request.form['title']
    description = request.form['description']

    # For now, we'll just print the data. In a real application, you might save this to a database.
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Request Type: {request_type}")
    print(f"Title: {title}")
    print(f"Description: {description}")

    # Redirect to a thank you page or back to the form
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)

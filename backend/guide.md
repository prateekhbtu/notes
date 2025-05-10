# Guide to Run the Django Backend

This guide provides step-by-step instructions to set up and run the Django backend for your project.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Python 3.x
- pip (Python package installer)
- virtualenv (optional but recommended)
- PostgreSQL (or any other database you prefer)

## Step 1: Set Up the Environment

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/notes-buddy.git
   cd notes-buddy/backend
   ```

2. **Create a virtual environment (optional but recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

## Step 2: Configure the Database

1. **Create a PostgreSQL database:**

   ```bash
   createdb notes_buddy_db
   ```

2. **Update the `settings.py` file with your database configuration:**

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'notes_buddy_db',
           'USER': 'your_db_user',
           'PASSWORD': 'your_db_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

## Step 3: Apply Migrations

1. **Run the following commands to apply migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

## Step 4: Create a Superuser

1. **Create a superuser to access the Django admin panel:**

   ```bash
   python manage.py createsuperuser
   ```

## Step 5: Run the Development Server

1. **Start the Django development server:**

   ```bash
   python manage.py runserver
   ```

2. **Open your browser and navigate to:**

   ```
   http://127.0.0.1:8000
   ```

   You should see the Django welcome page.

## Step 6: Access the Admin Panel

1. **Navigate to the admin panel:**

   ```
   http://127.0.0.1:8000/admin
   ```

2. **Log in with the superuser credentials you created earlier.**

## Additional Notes

- **Static Files:** Ensure you have configured static files correctly in your `settings.py` file.
- **Environment Variables:** Use a `.env` file to manage environment variables securely.
- **Deployment:** For production deployment, consider using a web server like Gunicorn and a reverse proxy like Nginx.

Congratulations! You have successfully set up and run the Django backend for your project.

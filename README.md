Book Tracker

Overview
This project is a personal book tracker web application that allows users to add, view, edit, and delete non-fiction books they have read. It features the ability to sort books by title, date read, or rating. The application uses a PostgreSQL database to store book information and is built with Node.js, Express.js, and EJS.

Features
- Add a new book: Submit details including title, author, rating, date read, and a review.
- Edit a book: Update details of an existing book.
- Delete a book: Remove a book from the list.
- Sort books: Filter books by title, date read, or rating.
- View book details: Click on a book title to see more information and reviews.

Technologies Used
- Node.js
- Express.js
- EJS
- PostgreSQL
- dotenv (for environment variables)

Setup
1. Clone the Repository

  git clone <repository-url>
  cd <repository-directory>

2. Install Dependencies

Make sure you have Node.js and npm installed. Then, install the necessary npm packages:
    npm install

3. Set Up the Database

    Create a PostgreSQL database: You can use a tool like pgAdmin or the command line to create a new database named books-db (or adjust the .env file if using a different name).

    Update .env File: Create a .env file in the project root directory with your database credentials:

    DB_USER=your_db_user
    DB_HOST=localhost
    DB_DATABASE=books-db
    DB_PASSWORD=your_db_password
    DB_PORT=5432

    Make sure to replace the placeholder values with your actual database credentials.

    Run Database Migrations: Ensure your database schema matches the expected structure. If using migrations or schema setup scripts, run them to create the necessary tables.

4. Start the Application

node app.js

The server will be running at http://localhost:3000.

Usage

    Add a Book: Navigate to the home page and use the form to add a new book.
    View Books: Books are displayed on the main page, sorted by default order or by clicking on sorting options.
    Edit a Book: Click the "Edit" button next to a book to update its details.
    Delete a Book: Click the "Delete" button next to a book to remove it from the list.
    View Book Details: Click on a book title to view detailed information and reviews.

// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    try {
        const { rows: books } = await pool.query('SELECT * FROM books ORDER BY rating DESC');
        res.render('index', { books });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows: [book] } = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('book-details', { book });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/add-book', (req, res) => {
    res.render('add-book');
});

app.post('/add-book', async (req, res) => {
    const { title, author, rating, date_read, review, cover_url } = req.body;
    try {
        await pool.query('INSERT INTO books (title, author, rating, date_read, review, cover_url) VALUES ($1, $2, $3, $4, $5, $6)', [title, author, rating, date_read, review, cover_url]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/edit-book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows: [book] } = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('edit-book', { book });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/edit-book/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, date_read, review, cover_url } = req.body;
    try {
        await pool.query('UPDATE books SET title = $1, author = $2, rating = $3, date_read = $4, review = $5, cover_url = $6 WHERE id = $7', [title, author, rating, date_read, review, cover_url, id]);
        res.redirect(`/book/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/delete-book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM books WHERE id = $1', [id]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

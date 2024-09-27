const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('frontend'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'sahyadri_safar'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

// Endpoint to get trekking destinations
app.get('/api/destinations', (req, res) => {
    db.query('SELECT * FROM destinations', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint to submit contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err) => {
        if (err) throw err;
        res.send('Message sent successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

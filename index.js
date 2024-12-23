const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // serve static files
app.set('view engine', 'ejs'); // set ejs template

let todos = [];

// Route
app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.post('/add', (req, res) => {
    const newTodo = req.body.todo;
    if (newTodo) todos.push(newTodo);
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && index >= 0 && index < todos.length) {
        todos.splice(index, 1);
    }
    res.redirect('/'); // Fixed syntax error
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


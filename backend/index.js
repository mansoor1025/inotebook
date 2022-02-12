const connect_to_mongo = require('./db');
connect_to_mongo();


const express = require('express');
const app = express();
const port = 3000;

// available routes
app.get('/api/aut', function (req, res) {
    res.send('Hello Mansoor!')
});

//auth routes
app.use('/api/auth', require('./routes/auth'));

// notes routes
app.use('/api/notes', require('./routes/notes'));

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

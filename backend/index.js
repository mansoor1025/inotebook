const connect_to_mongo = require('./db');
connect_to_mongo();


const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());

// parse application/json
app.use(bodyParser.json())
app.use(express.json());

// available routes
//auth routes

// app.post('/add-user', async (req, res,) => {
//     try {
//         console.log(req.body);
//         return
//         var users = new User(req.body)
//         await users.save();
//         res.send('user add successfully');
//     } catch (error) {
//         console.log('error generating');
//         res.send(error)
//     }
// })
app.use('/api/auth', require('./routes/auth'));

// notes routes
app.use('/api/notes', require('./routes/notes'));

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const linkRoute = require('./routers/linkRoute');
const path = require('path');


mongoose.connect('mongodb://localhost/link', { useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', () => { console.log("houve um erro") });
db.once('open', () => { console.log("banco carregado") });

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.use('/', linkRoute);
app.use(express.static(__dirname + '/templates'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
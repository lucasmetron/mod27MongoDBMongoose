const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/links', { useUnifiedTopology: true, useNewUrlParser: true })

let db = mongoose.connection;

db.on('error', () => { console.log("houve um erro") })
db.once('open', () => { console.log("banco carregado") })

app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
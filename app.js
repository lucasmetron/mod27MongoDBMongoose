const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/links', { useUnifiedTopology: true, useNewUrlParser: true }).then(db => {
    console.log(db)
}).catch(error => {
    console.log(console.error)
});



app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
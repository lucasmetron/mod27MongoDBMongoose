const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// const personSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// });


// const Person = mongoose.model('Person', personSchema);


// let person = new Person({
//     name: "Laís Pinheiro",
//     age: 23
// })

// person.save().then(doc => {
//     console.log(doc)
// }).catch(error => {
//     console.log(error)
// })


const linkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    click: { type: Number, default: 0 }
})

const Link = mongoose.model('Link', linkSchema);

let link = new Link({
    title: "youtube",
    description: "Site de vídeos.",
    url: "https://www.youtube.com.br"
})

link.save().then(doc => {
    console.log(doc)
}).catch(error => {
    console.log(error)
})


mongoose.connect('mongodb://localhost/link', { useUnifiedTopology: true, useNewUrlParser: true })

let db = mongoose.connection;

db.on('error', () => { console.log("houve um erro") })
db.once('open', () => { console.log("banco carregado") })

app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
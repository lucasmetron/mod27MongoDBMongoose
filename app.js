const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


const linkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    click: { type: Number, default: 0 }
})

const Link = mongoose.model('Link', linkSchema);



mongoose.connect('mongodb://localhost/link', { useUnifiedTopology: true, useNewUrlParser: true })

let db = mongoose.connection;

db.on('error', () => { console.log("houve um erro") })
db.once('open', () => {
    console.log("banco carregado")


    app.get('/:title', async (req, res) => {
        let title = req.params.title;


        try {
            let doc = await Link.findOne({ title: title });

            // res.send(doc) //somente para retornar na tela o obj para saber se deu certo ou nao.
            res.redirect(doc.url)

        } catch (error) {
            res.send(error)
        }


    })


})

app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
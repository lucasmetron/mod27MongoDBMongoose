const Link = require('../models/Link');

const redirect = async (req, res, next) => {
    let title = req.params.title;

    try {
        let doc = await Link.findOne({ title: title });
        console.log(doc)
        if (doc) {
            res.redirect(doc.url);
        } else {
            next();
        }

    } catch (error) {
        res.send(error)
    }
}

const addLink = async (req, res) => {
    let link = new Link(req.body)

    try {
        let doc = await link.save();
        res.send("Link adicionado com sucesso!");
    } catch (error) {
        res.render('index', { error, body: req.body })
    }
}

const allLinks = async (req, res) => {
    try {
        let links = await Link.find({})
        res.send(links);
    } catch (error) {
        res.render(error)
    }
}


module.exports = { redirect, addLink, allLinks }
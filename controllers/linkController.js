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
        res.redirect('/');
    } catch (error) {
        res.render('index', { error, body: req.body })
    }
}

const allLinks = async (req, res) => {
    try {
        let docs = await Link.find({})
        res.render('all', { lynks: docs });
    } catch (error) {
        res.render(error)
    }

}

const deleteLink = async (req, res) => {

    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }

    try {
        // res.send(await Link.deleteOne({ _id: id })) maneira que aprendemos anteriormente 
        await Link.findByIdAndDelete(id); //Metodo do mongoose
        res.redirect('/');
    } catch (error) {
        res.status(404).send(error);
    }
}

const loadLink = async (req, res) => {

    let id = req.params.id;
    try {
        let doc = await Link.find(id)
        res.render('/edit', { error: false, body: doc });
    } catch (error) {
        res.status(404).send(error);
    }
}

const editLink = async (req, res) => {

    let link = {};
    link.title = req.body.title;
    link.descrption = req.body.descrption;
    link.urls = req.body.urls;

    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }

    try {
        let doc = await Link.updateOne({ _id: id }, link);
        res.redirect('/');
    } catch (error) {
        res.render('edit', { error, body: req.body })
    }

}


module.exports = { redirect, addLink, allLinks, deleteLink, loadLink, editLink, editLink }
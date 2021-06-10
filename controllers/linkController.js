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
        res.render('all', { links });
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
        res.send(id);
    } catch (error) {
        res.status(404).send(error);
    }
}




module.exports = { redirect, addLink, allLinks, deleteLink }
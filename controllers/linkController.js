const Link = require('../models/Link');

const redirect = async (req, res) => {
    let title = req.params.title;

    try {
        let doc = await Link.findOne({ title: title });

        // res.send(doc) //somente para retornar na tela o obj para saber se deu certo ou nao.
        res.redirect(doc.url)

    } catch (error) {
        res.send(error)
    }
}

module.exports = { redirect }
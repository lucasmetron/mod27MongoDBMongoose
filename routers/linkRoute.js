const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

router.get('/all', linkController.allLinks) //essa rota tem que vir primeiro que a rota de baixo para não dar conflito 

router.get('/:title', linkController.redirect);

router.get('/', (req, res) => {
    res.render('index', { error: false, body: {} })
});

router.post('/', express.urlencoded({ extended: true }), linkController.addLink);

router.delete('/:id', linkController.deleteLink);

router.delete('/', express.json(), linkController.deleteLink)


module.exports = router;
const doacaoModel = require('../models/doacao');

function index (req, res){
    res.json('formulario');
}

async function store (req, res){
    try {
        await doacaoModel.create({
            
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports = { index, store };
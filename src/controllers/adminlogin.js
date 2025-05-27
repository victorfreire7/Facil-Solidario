const adminRepository = require('../models/admin');
const bcryptjs = require('bcryptjs');

async function index(req, res) {
    // create();
    res.json('login do admin');
}

async function store(req, res) {

    try {
        const admin = await adminRepository.findOne(
            {
                where:
                    {
                        login: req.body.login
                    }
            }
        )
        
        if(!admin){
            return res.json('login de acesso inválido');
        }

        await bcryptjs.compare(req.body.senha, admin.senha_hash)
        .then((result) => {
             if (result) {
                req.session.admin = admin;
                return res.json('redirectionando!');
            } else {
                return res.json('senha inválida');
            }
        });

    } catch (error) {
        res.json(error);
    }
}

async function create() {
    await adminRepository.create({
        login: "admin",
        senha_hash: await bcryptjs.hash("admin123", 8)
    })
}

module.exports = { index, store }
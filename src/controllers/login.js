const UsuarioRepository = require('../models/usuario');
const bcryptjs = require('bcryptjs');
require("dotenv").config();

function index (req, res){
    res.json('login');
}

async function show (req, res){
   
    try {
        
        const user = await UsuarioRepository.findOne(
            {
                where: 
                {
                    email: req.body.email
                }
            }
        );

        if(!user){
            return res.json('usuario nao encontrado')
        }

        await bcryptjs.compare(req.body.senha, user.senha_hash) // utilizamos await pois a promisse do bcrypt é assincrona.
        .then((result) => {
            if (result) {
                
            } else {
                return res.status(500).json('login invalido!');
            }
        }); 

        

    } catch (error) {
        res.json(error);
    }

}


module.exports = { index, show };
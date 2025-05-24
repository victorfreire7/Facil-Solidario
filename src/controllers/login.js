const UsuarioRepository = require('../models/usuario');
const bcryptjs = require('bcryptjs');
require("dotenv").config();
const jwt = require('jsonwebtoken');

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
                const id = user.id_usuario
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION
                });
                
                return res.json({token});
                 //criamos um jwt do usuario após ele logar corretamente          
                 //sempre que o usuario tentar acessar uma página que precisa de login, é solicitado este token 
            } else {
                return res.status(500).json('login invalido!');
            }
        }); 

        

    } catch (error) {
        res.json(error);
    }

}


module.exports = { index, show };
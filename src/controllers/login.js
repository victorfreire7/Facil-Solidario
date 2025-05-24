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
                req.session.user = user;

                const id = user.id_usuario
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: 300
                });
                res.set('Authorization', `Bearer ${token}`)
                return res.json({auth: true, token:token}); //criamos um jwt do usuario após ele logar corretamente           
            } else {
                return res.status(500).json('login invalido!')
            }
        }); 

        

    } catch (error) {
        res.json(error);
    }

}


module.exports = { index, show };
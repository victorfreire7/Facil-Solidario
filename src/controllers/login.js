const UsuarioRepository = require('../models/usuario');
const bcryptjs = require('bcryptjs');


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
            result 
            ? res.json('login realizado') 
            : res.json('senha incorreta');
        })
        ; 

    } catch (error) {
        res.json(error);
    }

}


module.exports = { index, show };
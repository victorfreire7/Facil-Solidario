const doacaoModel = require('../models/doacao');

function index (req, res){
    res.render('formulario', 
        { 
            csrfToken: req.csrfToken(), 
            successMessage: req.flash('successMessage'),
            errorMessage: req.flash('errorMessage'),
            popupMessage: req.flash('popupMessage')
        }
    );
}

async function store (req, res) {
    try { 
        const convertion = JSON.parse(req.body.allValues); // estou buscando isso no input hidden do ejs que armazena todos itens que foram enviados.

        for (const d of convertion) {// armazena todos os itens que podem ser doados, para fazer uma validação se o front e backend batem.
            if(d.quantidade > 51){
                req.flash('errorMessage', ['Por favor, digite quantidade menor do que 50.']);
                return res.redirect('/formulario-doacao');
            }
           
            if(
                d.item === 'cereais' ||
                d.item === 'graos' ||
                d.item === 'enlatados' ||
                d.item === 'sal' ||
                d.item === 'acucar' ||
                d.item === 'cafe' ||
                d.item === 'oleos' ||
                d.item === 'massas' ||
                d.item === 'leiteempo' 
            ){
                    await doacaoModel.create({
                        tipo: d.item,
                        quantidade: d.quantidade,
                        usuarioIdUsuario: req.session.user.id_usuario
                    });
            } else if(d == "") { // como foi programado pra, ao excluir um indice, esse indice ficar nulo; essa validação prossegue o laço de repetição
                continue;
            } else {
                req.flash('errorMessage', ['Digite um item válido ou uma quantidade menor do que 50.']);
                return res.redirect('/formulario-doacao');
            }
        }
        
        req.flash('popupMessage', ['AAAAA']);
        return res.redirect('/formulario-doacao');
    } catch (error) {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/admin');
    }
}

module.exports = { index, store };
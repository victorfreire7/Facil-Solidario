require("dotenv").config();
const express = require('express');
const session = require('express-session');
const homeRoute = require('./src/routes/home');

const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');

const quemsomosRoute = require('./src/routes/quemsomos');
const pontoscoletaRoute = require('./src/routes/pontoscoleta');
const politicasRoute = require('./src/routes/politicas');
const cadastrarRoute = require('./src/routes/cadastrar');
const esquecisenhaRoute = require('./src/routes/esquecisenha');
const loginRoute = require('./src/routes/login');
const logoutRoute = require('./src/routes/logout');
const formularioRoute = require('./src/routes/formulario');
const adminloginRoute = require('./src/routes/adminlogin');
const adminRoute = require('./src/routes/admin');

const loginRequired = require('./src/middlewares/loginRequired');
const adminloginRequired = require('./src/middlewares/adminloginRequired');
const csrfMiddleware = require('./src/middlewares/csrfMiddleware');

const db = require('./src/db');

class App {
    constructor(){
        this.app = express();
        this.db();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.set('views', './src/views');
        this.app.set('view engine', 'ejs');
        this.app.use(express.json());

        this.app.use(bodyParser.urlencoded({ extended: false })); // permite a analise de dados STRING e ARRAY em formularios
        this.app.use(cookieParser());
        this.app.use(csrf({ cookie: true }));
        this.app.use(csrfMiddleware) // MIDDLEWARE QUE VERIFICA SE O CSRFTOKEN É O CORRETO.

        
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: 30*24*60*60*1000
            }
        }))
      }

    routes() {
        this.app.use('/', homeRoute);
        this.app.use('/quem-somos', quemsomosRoute);
        this.app.use('/pontos-de-coleta', pontoscoletaRoute);
        this.app.use('/politicas-de-privacidade', politicasRoute);
        this.app.use('/sign-up', cadastrarRoute);
        this.app.use('/sign-in', loginRoute);
        this.app.use('/logout', logoutRoute);
        this.app.use('/forget-password', esquecisenhaRoute); // nao to conseguindo renderizar esta rota no localhost
        this.app.use('/formulario-doacao', loginRequired, formularioRoute);
        
        this.app.use('/admin-login', adminloginRoute);
        this.app.use('/admin', adminloginRequired, adminRoute);
    }

    db(){
        db.sync(()=> { console.log('BD conectado') })
        .then(() => {
            this.app.emit('connection-established'); 
            /* 
            crio um string de emissao chamada 'connection-established' que é ativada apenas quando a conexao com o banco de ados é estabelecida.
            essa string é emissao é utilizada posteriormente no arquivo 'server.js'
            */
        });
    }
}


module.exports = new App().app;
require("dotenv").config();
const express = require('express');
const session = require('express-session');
const homeRoute = require('./src/routes/home');
const adminRepository = require('./src/models/admin');
const sgMail = require('@sendgrid/mail');

const helmet = require('helmet');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const randomStringGenerator = require('random-string-generator');
const bcryptjs = require('bcryptjs');
const cron = require('node-cron');

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
        this.cronAdminCode();
        // this.sendAdminCode();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.set('views', './src/views');
        this.app.set('view engine', 'ejs');
        this.app.use(express.json({ limit: '10kb'})); // caso o usuario tente enviar dados maiores do que 10kb, sera retornado um erro.
        this.app.use(helmet()); // habilito a biblioteca helmet, protegendo o cabeçalho do HTML
        this.app.use(flash());

        this.app.use(bodyParser.urlencoded({ extended: false })); // permite a analise de dados STRING e ARRAY em formularios
        this.app.use(cookieParser());
        this.app.use(csrf({ cookie: true }));
        this.app.use(csrfMiddleware); // MIDDLEWARE QUE VERIFICA SE O CSRFTOKEN É O CORRETO.

        
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
                maxAge: 30*24*60*60*1000
            }
        }));
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

        this.app.use((req, res) => { res.status(404).render('404')})
    }

    cronAdminCode(){
        cron.schedule('0 5 * * *', () => { // 0 5 para se adequar ao horario de brasilia -> 00:00
            this.sendAdminCode();
        })
    }

    sendAdminCode(req, res){
        try {
            let dayLogin = randomStringGenerator(6); // gera uma string aleátoria de 6 caracteres.
            let dayPassword = randomStringGenerator(25); // faço o mesmo aqui
            
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            sgMail.send({
                to: 'solidariofacil@gmail.com',
                from: process.env.SENDGRID_API_EMAIL,
                html: 
                `
                    <!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Código de Cadastro</title>
                    </head>
                    <body style="margin: 0; padding: 20px; background-color: #e5e5e5; font-family: Arial, sans-serif;">
                        <div style="background-color: #8fa687; border-radius: 12px; color: #ffffff; text-align: center; padding: 40px 20px; max-width: 400px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);">
                            <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 25px;">Código de Cadastro</h2>
                            
                            <div style="margin-bottom: 25px;">
                                <img src="http://localhost:3030/assets/img/logo-sem-txt.svg" alt="LOGOTIPO" style="width: 90px;" />
                            </div>
    
                            <div style="font-size: 28px; font-weight: bold; letter-spacing: 10px; background-color: #748e73; color: #ffffff; display: inline-block; padding: 12px 20px; border-radius: 8px; margin-bottom: 25px;">
                                LOGIN: ${dayLogin}   
                                SENHA: ${dayPassword}
                            </div>
    
                            <p style="font-size: 15px; color: #f1f1f1; line-height: 22px;">
                                Bom serviço!
                            </p>
                        </div>
                    </body>
                    </html>
                `,
                subject: `LOGIN DE ADMINISTRADOR DO DIA.`,
                text: 
                `
                    Seu login atual para entrar como ADMINISTRADOR no sistemas do Fácil Solidário LTDA. é:
        
                    \n \n \n
        
                    LOGIN: ${dayLogin}   
                    SENHA: ${dayPassword}
        
                    \n \n \n
        
                    Tenha um bom serviço!
                `
            }); // envio no E-mail, o login e a senha do dia para acesso do admin

            this.storeAdminCode(dayLogin, dayPassword); // adiciono as informações do ADMIN no BD
        } catch {
            this.app.use((req, res) => { res.status(404).render('404')})
        }  
    }

    async storeAdminCode(login, pass){
        let admins = await adminRepository.findOne(); //guardo dentro de uma constante os valores da tabela admin
        if(!admins){ // caso nao exista um admin ainda, eu vou criar um.
            await adminRepository.create({
                login: login, // seto como valor de login, a string aleatoria criada anteriormente.   
                senha_hash: await bcryptjs.hash(pass, 8) // faço o mesmo com a senha.
            });
        } else { // caso já exista um admin, eu mudo os valores dele pros novos
            await admins.update({
                login: login,
                senha_hash: await bcryptjs.hash(pass, 8)
            });
        }
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
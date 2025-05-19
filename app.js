const express = require('express');
const homeRoute = require('./src/routes/home');
const quemsomosRoute = require('./src/routes/quemsomos');
const pontoscoletaRoute = require('./src/routes/pontoscoleta');
const politicasRoute = require('./src/routes/politicas');


class App {
    constructor(){
        this.app = express();
        this.use
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
      }

    routes() {
        this.app.use('/', homeRoute);
        this.app.use('/quem-somos', quemsomosRoute);
        this.app.use('/pontos-de-coleta', pontoscoletaRoute);
        this.app.use('/politicas-de-privacidade', politicasRoute);
    }
}


module.exports = new App().app;
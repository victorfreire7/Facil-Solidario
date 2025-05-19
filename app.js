const express = require('express');
const homeRoute = require('./src/routes/home');
const quemsomosRoute = require('./src/routes/quemsomos');


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
    }
}


module.exports = new App().app;
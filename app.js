const express = require('express');
// const app = express();
const homeRoute = require('./src/routes/home');

class App {
    constructor(){
        this.app = express();
        this.routes();
    }

    routes() {
        this.app.use('/', homeRoute);

    }
}


module.exports = new App().app;
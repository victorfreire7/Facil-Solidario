const express = require('express');
const app = express();

const routes = express.Router();
routes.get('/', (req, res)=> {
    res.json('hello world!');
} )


app.use(routes);


module.exports = app;
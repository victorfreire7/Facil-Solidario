require("dotenv").config();
const app = require('./app');

app.on('connection-established', () => { // ao a string de emissao ser ativa, o proximo método é capacitado de ser utilizado.
    app.listen(port, () => {
        console.log(`Ouvindo na porta http://localhost:${parseInt(process.env.PORT)}`);
    });
});
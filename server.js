require("dotenv").config();
const app = require('./app');

app.on('connection-established', '0.0.0.0', () => { // ao a string de emissao ser ativa, o proximo método é capacitado de ser utilizado.
    app.listen(parseInt(process.env.PORT), () => {
        console.log(`Ouvindo na porta http://localhost:${process.env.PORT}`);
    });
});

require("dotenv").config();
const app = require('./app'); // a class ja esta executada ao importa-la

app.on('connection-established', () => { // ao a string de emissao ser ativa, o proximo método é capacitado de ser utilizado.
    app.listen(parseInt(process.env.PORT), '0.0.0.0', () => {
        console.log(`Ouvindo na porta http://localhost:${process.env.PORT}`);
    });
});

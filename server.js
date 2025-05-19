const app = require('./app');
const port = 3030;

app.listen(port, () => {
    console.log(`Ouvindo na porta http://localhost:${port}`);
});
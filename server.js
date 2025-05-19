const app = require('./app');
const port = 3010;

app.listen(port, () => {
    console.log(`Ouvindo na porta http://localhost:${port}`);
})


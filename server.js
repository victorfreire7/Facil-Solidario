var ip = '192.168.137.1';
var porta = 3636;


// Importa o módulo http para criar o servidor
const http = require('http');

// Importa o módulo fs para ler arquivos do sistema
const fs = require('fs');

// Importa o módulo path para trabalhar com caminhos de arquivos
const path = require('path');

// Define o hostname como '0.0.0.0' para aceitar conexões da rede local
const hostname = ip;

// Define a porta onde o servidor vai rodar
const port = porta;

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
  // Define o caminho do arquivo que será servido com base na URL requisitada
  let filePath = '.' + req.url;

  // Se a URL for '/', serve o arquivo index.html por padrão
  if (filePath == './') {
    filePath = './home.html';
  }

  // Pega a extensão do arquivo para definir o tipo MIME correto
  const extname = String(path.extname(filePath)).toLowerCase();

  // Objeto que relaciona extensões com seus tipos MIME
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
  };

  // Define o content-type baseado na extensão do arquivo
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Lê o arquivo solicitado no disco
  fs.readFile(filePath, (error, content) => {
    if (error) {
      // Se o arquivo não existir, retorna 404
      if(error.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      }
      else {
        // Se for outro erro, retorna 500
        res.writeHead(500);
        res.end(`Erro do servidor: ${error.code}`);
      }
    }
    else {
      // Se o arquivo foi encontrado, retorna o conteúdo com o content-type correto
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Inicia o servidor escutando na porta e hostname definidos
server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/home.html`);
});

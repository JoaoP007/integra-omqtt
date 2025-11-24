const http = require("http");
const path = require("path");
const RED = require("node-red");

// Cria o servidor HTTP
const server = http.createServer();

// Pasta onde o Node-RED vai guardar flows, credenciais etc.
// Aqui uso a própria pasta do projeto:
const userDir = path.join(__dirname, ".");

const settings = {
  httpAdminRoot: "/",           // editor na raiz
  httpNodeRoot: "/",            // endpoints HTTP na raiz
  uiPort: process.env.PORT || 1880,
  userDir: userDir,             // 👈 ESSENCIAL
  flowFile: "flows.json",       // nome do arquivo de flows
  functionGlobalContext: {}
};

RED.init(server, settings);

server.on("request", (req, res) => {
  RED.httpAdmin(req, res);
  RED.httpNode(req, res);
});

server.listen(settings.uiPort, () => {
  console.log("Node-RED rodando na porta", settings.uiPort);
});

RED.start();

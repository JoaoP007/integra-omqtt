const http = require("http");
const RED = require("node-red");

// Cria server HTTP
const server = http.createServer();

// Configura Node-RED
const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/",
  uiPort: process.env.PORT || 1880,
  functionGlobalContext: {}
};

// Inicializa Node-RED
RED.init(server, settings);

// Roteia requisições HTTP para o Node-RED
server.on("request", (req, res) => {
  RED.httpAdmin(req, res);
  RED.httpNode(req, res);
});

// Sobe o servidor
server.listen(settings.uiPort, () => {
  console.log("Node-RED rodando na porta", settings.uiPort);
});

// Inicia os fluxos
RED.start();

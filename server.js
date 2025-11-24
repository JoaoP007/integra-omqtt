const http = require("http");
const path = require("path");
const express = require("express");
const RED = require("node-red");

const app = express();

// Porta usada pela Render
const port = process.env.PORT || 1880;

// Diretório onde flows.json ficará armazenado
const userDir = path.join(__dirname, ".");

// Configurações do Node-RED
const settings = {
    httpAdminRoot: "/",
    httpNodeRoot: "/",
    userDir: userDir,
    flowFile: "flows.json",
    functionGlobalContext: {},
};

// Inicializa o Node-RED
RED.init(app, settings);

// Roteia / para o editor do Node-RED
app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

// Inicia servidor HTTP
const server = http.createServer(app);

// Inicia servidor Node-RED
server.listen(port, () => {
    console.log(`Node-RED rodando na porta ${port}`);
});

RED.start();

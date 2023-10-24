const api = require('./api');
const sockets = require('./sockets');

const http = require('http');
const { Server } = require("socket.io");

const httpServer = http.createServer(api);
const SocketServer = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = 3000;

httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);

sockets.listen(SocketServer);
const httpServer = require('http').createServer();
const { Server } = require("socket.io");

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = 3000;
httpServer.listen(PORT);
let readyPlayerCount = 0;

console.log(`Listening on port ${PORT}...`);

io.on('connection', (socket) => {
  console.log('a user connected..', socket.id);

  socket.on('ready', () => {
    console.log('Player ready', socket.id);
    readyPlayerCount++;
    if (readyPlayerCount%2 === 0) {
      // broadcast('startGame') event
      io.emit('startGame', socket.id); // sending this event to all the clients
    }
  });

  socket.on('paddleMove', (paddleData) => {
    // emiting this event to all the clients except for the sender
    socket.broadcast.emit('paddleMove', paddleData);
  });

  socket.on('ballMove', (ballData) => {
    socket.broadcast.emit('ballMove', ballData);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client ${socket.id} disconnected: ${reason}`);
  });
});

let readyPlayerCount = 0;

function listen(io){
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
}

module.exports = {
    listen,
}
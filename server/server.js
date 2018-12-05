const app = require('express')();
const http = require('http').Server(app);
const socketIO = require('socket.io')(http);
const port = 3000;

http.listen(port, () => {
    console.log(`Started on port ${port}`);
});

socketIO.on('connection', socket => {
    socket.on('message-to-host', data => {
        console.log(`Received message from: ${data.user} to host`);
        let msg = {
            user: data.user,
            text: data.text
        };
        socket.broadcast.emit('channel-host', msg)
    });
    socket.on('message-from-host', data => {
        console.log(`Received message from host to: ${data.receiver}`);
        let msg = {
            user: 'host',
            text: data.text
        };
        socket.broadcast.emit(`channel-${data.receiver}`, msg)
    })
});
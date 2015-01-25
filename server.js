/**
 * Setup
 */
// Load Express, the Node JS web framework
var express = require('express');
var app = express();

// Load a web server for the video pages
var http = require('http').Server(app);

// Load utilities for file paths
var path = require('path');
var io = require('socket.io')(http);


/**
 * Routing
 */
// Serve files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/public/00-chat-test.html');
});

app.get('/01', function(req, res){
    res.sendFile(__dirname + '/public/01-laptop-canadarm.html');
});

app.get('/06', function(req, res){
    res.sendFile(__dirname + '/public/06-laptop-code-01.html');
});


/**
 * Socket communication
 */
io.on('connection', function(socket) {
    console.log('A computer connected');

    // Chat message
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        console.log('msg - ', msg);
    });

    // Video message
    socket.on('video-msg', function(msg){
        console.log('Video message: ', msg);
        // Send the message back out to the workers
        io.emit('video-msg', msg);
    });

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});


/**
 * Server
 *
 * Start the web server and list on port 3000
 */
http.listen(3000, function(){
    console.log('Listening on *:3000');
});

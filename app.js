const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Socket.io connections
io.on('connection', (socket) => {
    console.log('a user connected');
  
    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
  
    // Disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
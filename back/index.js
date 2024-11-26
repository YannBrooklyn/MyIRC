"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
var http = require('http');
var Server = require('socket.io').Server;
var RegexCharacter = /[a-zA-Z\d\s]{5,13}$/;
var RegexNumber = /[\d]{1}$/;
app.use(cors({ origin: "http://localhost:3000" }));
var server = http.createServer(app);
var io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on('connection', function (socket) {
    socket.on("join_room", function (data) {
        console.log(data);
        socket.join(data);
    });
    socket.on("send_message", function (data) {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
    });
});
server.listen(3009, function () {
    console.log("Socket runned");
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users', require('./routes/users.ts'));
app.use('/privatemessages', require('./routes/privatemessages.ts'));
app.use('/channelmessages', require('./routes/channelmessages.ts'));
app.use('/roles', require('./routes/roles.ts'));
app.use('/privates', require('./routes/privates.ts'));
app.use('/channels', require('./routes/channels.ts'));
app.listen(3407);

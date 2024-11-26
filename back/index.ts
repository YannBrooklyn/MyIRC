import * as express from 'express';
import * as cors from 'cors';
const app = express()
const http = require('http')
const { Server } = require('socket.io')

const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
const RegexNumber: RegExp= /[\d]{1}$/

app.use(cors({origin: "http://localhost:3000"}))
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})




io.on('connection', (socket) => {
    socket.on("join_room", (data)=>{
        console.log(data)
        
        socket.join(data)
    })
    socket.on("send_message", (data)=> {
        console.log(data)
       socket.to(data.room).emit("receive_message", data) 
    })
});

server.listen(3009, () => {
    console.log("Socket runned")
})





app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/users', require('./routes/users.ts'));
app.use('/privatemessages', require('./routes/privatemessages.ts'));
app.use('/channelmessages', require('./routes/channelmessages.ts'));
app.use('/roles', require('./routes/roles.ts'));
app.use('/privates', require('./routes/privates.ts'));
app.use('/channels', require('./routes/channels.ts'));


app.listen(3407)

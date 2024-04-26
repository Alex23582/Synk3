
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const http = require('node:http');
const https = require('node:https')
const { Server } = require('socket.io');
const app = express();
var corsOptions = {
    origin: process.env.PUBLIC_URL,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server, {
    cors: corsOptions
});



let rooms = {}
let lastRoomStates = {}
let socketToRoomMap = {}
let usernames = {}

io.on('connection', (socket) => {
    socket.on("joinroom", (roomname, username) => {
        if (!rooms[roomname]) {
            rooms[roomname] = {
                name: roomname,
                counter: 0,
                members: [],
                source: "https://www.w3schools.com/html/mov_bbb.mp4"
            }
        }
        let roomobject = rooms[roomname]
        roomobject.members.push({
            id: roomobject.counter,
            socketid: socket.id,
            socket,
            name: username,
            admin: false
        })
        roomobject.counter++
        socketToRoomMap[socket] = roomname
        usernames[socket] = username
        broadcastMemberlist(roomname)
    })
    socket.on("requestRoomState", () => {
        if (!socketToRoomMap[socket]) {
            return
        }
        const roomname = socketToRoomMap[socket]
        const lastState = lastRoomStates[roomname]
        if (lastState) {
            if (lastState.state == 1) {
                const elapsedTime = (Date.now() - lastState.servertime) / 1000
                socket.emit("room", { ...lastState, time: lastState.time + elapsedTime })
            } else {
                socket.emit("room", lastState)
            }
        }
        socket.emit("room", { type: "changesrc", newsrc: rooms[roomname].source })
    })
    socket.on("newvideo", (url) => {
        if (!socketToRoomMap[socket]) {
            return
        }
        const roomname = socketToRoomMap[socket]
        const username = usernames[socket]
        changeSourceInRoom(roomname, username, url)
    })
    socket.on("room", (message) => {
        if (!socketToRoomMap[socket]) {
            return
        }
        const roomname = socketToRoomMap[socket]
        if (message.state) {
            if (message.state == 1) {
                message.servertime = Date.now()
            }
            lastRoomStates[roomname] = message
            broadcastToRoom(roomname, "room", message)
        }
    })
    socket.on("chat", (message) => {
        if (!socketToRoomMap[socket]) {
            return
        }
        const roomname = socketToRoomMap[socket]
        const username = usernames[socket]
        broadcastToRoom(roomname, "chat", {
            author: username,
            message
        })
    })
    socket.on("ping", (servertime) => {
        socket.emit("ping", servertime)
    })
    socket.on("disconnect", () => {
        if (!socketToRoomMap[socket]) {
            return
        }
        const roomname = socketToRoomMap[socket]
        let roomobject = rooms[roomname]
        roomobject.members = roomobject.members.filter((member) => member.socketid != socket.id)
        broadcastMemberlist(roomname)
    })
})

async function changeSourceInRoom(roomname, username, url) {
    const newState = { state: 2, time: 0 }
    lastRoomStates[roomname] = newState
    broadcastToRoom(roomname, "room", newState)

    rooms[roomname].source = url
    broadcastToRoom(roomname, "room", { type: "changesrc", newsrc: url })
    broadcastToRoom(roomname, "chat", {
        author: "",
        message: `${username} changed the video`,
        system: true
    })
}

function broadcastMemberlist(roomname) {
    const roomobject = rooms[roomname]
    const broadcastMembers = roomobject.members.map((member) => {
        return {
            id: member.id,
            name: member.name,
            admin: member.admin
        }
    })
    broadcastToRoom(roomname, "room", {
        type: "memberlist",
        members: broadcastMembers
    })
}

function broadcastToRoom(roomname, channel, message) {
    const roomobject = rooms[roomname]
    roomobject.members.forEach(member => {
        member.socket.emit(channel, message)
    });
}

const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hellow World!')
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});
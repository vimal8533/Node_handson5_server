const express = require("express")
const socket = require("socket.io")

const app = express()
const server = app.listen(3005, () => {
    console.log("running on 3005 ")
})
const io = socket(server, {
    cors: {
        origin: "*"
    }
})

io.on('connection', (socketClient) => {
    console.log(socketClient.id);
    socketClient.on("MESSAGE", (data) => {
        console.log(data);
        socketClient.emit("CLIENT", "message from server side")

    })

    socketClient.on("BROADCAST", (data) => {
        console.log(data);
        io.emit("CLIENTAll", data)

    })

})
app.get("/", (req, res) => {
    res.send("Welcome vimal")
})
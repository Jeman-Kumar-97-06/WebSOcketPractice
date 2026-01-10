/*
The following line,
    imports the socket.io library. --> require('socket.io')
    then, immediately calls that function with argument 3000,
    --> require('socket.io') expects either a PORT number or a HTTP server instance as argument.
    then, it returns the Socket.IO server intance.
*/
const io = require('socket.io')(3000) //Here 'io' is the socker server.

io.on('connection',socket=>{
    console.log(socket.id)
})
/*
The following line,
    imports the socket.io library. --> require('socket.io')
    then, immediately calls that function with argument 3000,
    --> require('socket.io') expects either a PORT number or a HTTP server instance as argument.
    then, it returns the Socket.IO server intance.
*/

/*
Basically the line 'const io = require('socket.io')(3000)', creates a HTTP server, starts listening at 3000, attached a websocket + Long-polling
upgrade handler and assigns that server controller to 'io'.
*/
const io = require('socket.io')(3000,{cors:{origin:['http://localhost:5173']}}) //Here 'io' is the socker server.

io.on('connection',socket=>{
    console.log(socket.id)
})
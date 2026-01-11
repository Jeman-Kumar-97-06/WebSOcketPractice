const {instrument} = require('@socket.io/admin-ui')
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

//Here 'io' is the socker server.
const io = require('socket.io')(3000,{cors:{
    origin:['http://localhost:5173','https://admin.socket.io']
}}) 

const userIo = io.of('/user');
userIo.on('connection',socket=>{
    //Yup, username returned by getUsernameFromToken is accessible here.
    console.log('connected to user with username'+socket.username)
})

userIo.use((socket,next)=>{
    if(socket.handshake.auth.token){
        socket.username = getUsernameFromToken(socket.handshake.auth.token);
        next();
    }
    else {
        next(new Error('Please send token!'))
    }
})

function getUsernameFromToken(token){
    //-----Db logic to get username from token will go here-----------
    return token+'user'
}

io.on('connection',socket=>{
    // socket.on('custom-event',(number,string,eve)=>{
    //     console.log(number,string,eve)
    // })
    socket.on('send-message',(msg,room)=>{
        if (room==''){
            socket.broadcast.emit('receive-message',msg)
        }
        else {
            socket.to(room).emit('receive-message',msg);
        }
    });
    socket.on('join-room',(room,cb)=>{
        socket.join(room);
        cb(`Joined ${room}`)
    });
})

instrument(io,{auth:false})//No auth required to enter the admin dashboard

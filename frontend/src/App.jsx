import {io} from 'socket.io-client';
import {useRef} from 'react';

function App() {

  const messageInput   = useRef();
  const roomInput      = useRef();

  // const joinRoomButton = document.getElementById('room-button');
  // const messageInput   = document.getElementById('message-input');
  // const roomInput      = document.getElementById('room-input');
  // const form           = document.getElementById("form");

  const socket         = io('http://localhost:3000')

  socket.on('connect',()=>{
    displayMessage(`You connected with id : ${socket.id}`)
  })

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const message = messageInput.current.value;
    const room    = roomInput.value;
    if (message == ''){
      return;
    }
    displayMessage(message);
    messageInput.value= '';
  }

  const onJoinRoomClick =  () => {
    const room = roomInput.current.value;
    console.log(room);
  }

  function displayMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    document.getElementById('message-container').append(div);
  }

  return (
    <>
      {/* Div that shows to and from messages */}
      <div id='message-container'></div>
      <form id='form' onSubmit={handleOnSubmit}>
        {/* Message input */}
        <label htmlFor='message-input'>Message</label>
        <input type='text' id='message-input' ref={messageInput}/>
        {/* Button to send the message */}
        <button type='submit' id='send-button'>Send</button>

        <br/>

        {/* Room Input */}
        <label htmlFor='room-input'>Room</label>
        <input type="text" id='room-input' ref={roomInput}/>
        {/* Button to join a room */}
        <button type='button' id='room-button' onClick={onJoinRoomClick}>Join</button>
      </form>
    </>
  )
}

export default App

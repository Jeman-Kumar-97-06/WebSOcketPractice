import {io} from 'socket.io-client';
import {useRef, useEffect, useState} from 'react';

function App() {

  const [messagesAll,setMessagesAll]   = useState([]);

  const messageInput   = useRef();
  const roomInput      = useRef();
  const socketRef      = useRef(null);

  useEffect(()=>{
    socketRef.current= io('http://localhost:3000');
    socketRef.current.on('connect',()=>{
      displayMessage(`You connected with id: ${socketRef.current.id}`)
    });

    // socket.emit('custom-event',10,'HI',{a:'shit'})
    socketRef.current.on('receive-message',message=>{
      displayMessage(message)
    })
    //The function returned below is a cleanup function. It runs when component unmounts or when there's a hot reload.
    return () => {
      socketRef.current.disconnect();
    }
  },[]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const message = messageInput.current.value;
    const room    = roomInput.value;
    if (message == ''){
      return;
    }
    displayMessage(message);
    socketRef.current.emit('send-message',message);
    messageInput.current.value= '';
  }

  const onJoinRoomClick =  () => {
    const room = roomInput.current.value;
    console.log(room);
  }

  function displayMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    setMessagesAll(prev => [...prev, message]);//'prev' is the existing messageAll object.
  }

  return (
    <>
      {/* Div that shows to and from messages */}
      <div id='message-container'>
        {messagesAll.map(msg => (
          <div>{msg}</div>
        ))}
      </div>
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

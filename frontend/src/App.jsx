function App() {

  const joinRoomButton = document.getElementById('room-button');
  const messageInput   = document.getElementById('message-input');
  const roomInput      = document.getElementById('room-input');
  const form           = document.getElementById("form");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const room    = roomInput.value;
    if (message == ''){
      return;
    }
    displayMessage(message);
    messageInput.value= '';
  }

  const onJoinRoomClick =  () => {
    const room = roomInput.value;
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
        <label for='message-input'>Message</label>
        <input type='text' id='message-input'/>
        {/* Button to send the message */}
        <button type='submit' id='send-button'>Send</button>

        <br/>

        {/* Room Input */}
        <label for='room-input'>Room</label>
        <input type="text" id='room-input'/>
        {/* Button to join a room */}
        <button type='button' id='room-button'>Join</button>
      </form>
    </>
  )
}

export default App

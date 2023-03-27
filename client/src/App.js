import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [msgReceived, setMsgReceived] = useState("");
  const [room, setRoom] = useState("");
  const [senderArray, setSenderArray] = useState([]);
  const [receiverArray, setReceiverArray] = useState([]);

  console.log("person1", msgReceived);
  console.log("person2", message);

  const sendMessage = () => {
    if (room !== "") {
      socket.emit("send_message", [message, room]);
    }
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        setMsgReceived(data);
        setReceiverArray([...receiverArray, data]);
      },
      [socket]
    );
  });

  return (
    <div className="main_container">
      <div className="room_container ">
        <input
          className="input1"
          type="number"
          placeholder="Room Number"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button className="btn" onClick={()=>{joinRoom();alert(`You joined room number : ${room}`)}}>
          Join Room
        </button>
      </div>
      <div className="chat_container">
        <div className="msg_receive">
          {receiverArray?.map((msg, i) => {
            return (
              <div key={i} className="chat_receive">
                <p>{msg}</p>
              </div>
            );
          })}
        </div>
        <div className="msg_send">
          {senderArray?.map((msg, i) => {
           return (
            <div key={i} className="chat_send">
              <p>{msg}</p>
            </div>
          );
          })}
        </div>
      </div>
      <div className="message_container">
        <input
          className="input2"
          type={"text"}
          placeholder="Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="btn"
          onClick={() => {
            sendMessage();
            setSenderArray([...senderArray, message]);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScoket } from "../Context/SocketProvider";

const Homepage = () => {
  const redirect = useNavigate();
  const { socket } = useScoket();
  const [email, setemail] = useState("");
  const [roomid, setroomid] = useState("");

  const handleJoinRoom = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("join-room", { roomId: roomid, emailId: email });
    },
    [socket, roomid, email]
  );

  const handlejoinedroom = useCallback((roomId) => {
      redirect(`/room/${roomId}`);
    },[redirect]);

  useEffect(() => {
    socket.on("joinedroom", handlejoinedroom);
    return () => {
      socket.off("joinedroom", handlejoinedroom);
    };
  }, [socket, handlejoinedroom]);

  return (
    <div className="homapage-container">
      <form>
        <input
          type="text"
          placeholder="Enter Your Email here"
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Your Room id here"
          onChange={(e) => setroomid(e.target.value)}
        />
        <br />
        <button onClick={handleJoinRoom}>Join The Room</button>
      </form>
    </div>
  );
};

export default Homepage;

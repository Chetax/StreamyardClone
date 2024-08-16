import React, { useEffect, useState } from "react";
import  {useNavigate}   from 'react-router-dom'
import { useScoket } from "../Context/SocketProvider";


const Homepage=()=> {
    const redirect=useNavigate();
    const {socket}=useScoket();
    const [email,setemail]=useState("");
    const [roomid,setroomid]=useState("");
          const handleJoinRoom=(e)=>{
            e.preventDefault();
            socket.emit("join-room",{roomId:roomid,emailId:email});
          }
const handlejoinedroom=(gotroomId)=>{
    redirect(`/room/${gotroomId}`)
}
 useEffect(()=>{
           socket.on("joinedroom",handlejoinedroom)

        },[socket])
        
        return (
            <div className="homapage-container">
          <form action="" >
          <input type="text"  placeholder="Enter YOut Email here" onChange={(e)=>{setemail(e.target.value)}}/><br />
          <input type="text" placeholder="Enter YOut Room iD here"  onChange={(e)=>{setroomid(e.target.value)}}/><br />
          <button onClick={handleJoinRoom}>Join The Room </button>
          </form>
            </div>
        )
    }

    export default Homepage
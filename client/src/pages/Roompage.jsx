import React, { useEffect } from 'react'
import { useScoket } from '../Context/SocketProvider'

export default function Roompage() {
    const {socket}=useScoket();
   const handleUserjoned=(data)=>{
   const {emailId}=data;
    console.log(`User Joned ${emailId}`)
   }
    useEffect(()=>{
        socket.on("user-joined",handleUserjoned);
    },[socket])
  return (
    <div>Room</div>
  )
}

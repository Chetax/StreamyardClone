import React, { useEffect, useCallback, useState } from "react";
import { useScoket } from "../Context/SocketProvider";
import { usePeer } from "../Context/Peer";
import { Box, Container, Typography } from "@mui/material";

export default function Roompage() {
  const { socket } = useScoket();
  const { peer, createOffer ,creaeteAnswer,setRemoteAnswer} = usePeer();
  const [incommingcallEmail,setIncommingCallemail]=useState("");

  const handleUserjoned = useCallback(async ({emailId}) => {
      console.log("New User Joinde", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });

    },[socket, createOffer,peer]);

    const handleIncommingcall=useCallback(async (data)=>{
      console.log("Handle Inccmongin call function get called")
      const {from,offer}=data;
      setIncommingCallemail(from);
      const answer=await creaeteAnswer(offer);
      socket.emit('call-accepted',{from,answer})
      console.log("Call from ",{from,offer})
    },[socket,incommingcallEmail,creaeteAnswer])
  
    const handleCallAccepted = useCallback(
      async (data) => {
        console.log("Final call-accepted function get called from seever and printin in cliejnt");
        const { answer } = data;
        await setRemoteAnswer(answer);
        console.log("Call Got Accepted", {answer});
      },
      [setRemoteAnswer]
    );

  useEffect(() => {
    socket.on("user-joined", handleUserjoned);
    socket.on("incomming-call",handleIncommingcall)
    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleUserjoned);
      socket.off("incomming-call",handleIncommingcall)
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleUserjoned,handleIncommingcall,handleCallAccepted]);

  return (
    <>
      <Container>
        <Box>
          <Typography variant="h3" sx={{ textDecoration: "underline" }}>
            Welcome To StreamYard Room
          </Typography>
        </Box>
      </Container>
    </>
  );
}

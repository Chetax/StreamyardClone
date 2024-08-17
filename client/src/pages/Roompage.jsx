import React, { useEffect, useCallback } from "react";
import { useScoket } from "../Context/SocketProvider";
import { usePeer } from "../Context/Peer";
import { Box, Container, Typography } from "@mui/material";

export default function Roompage() {
  const { socket } = useScoket();
  const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer();

  const handleUserjoned = useCallback(async (emailId) => {
      console.log("New User Joinde", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },[socket, createOffer]);

  const handleIncommingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { from, ans });
    },
    [socket, createAnswer]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      await setRemoteAnswer(ans);
      console.log("Call Accepted", ans);
    },
    [setRemoteAnswer]
  );

  useEffect(() => {
    socket.on("user-joined", handleUserjoned);
    socket.on("incoming-call", handleIncommingCall);
    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleUserjoned);
      socket.off("incoming-call", handleIncommingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleUserjoned, handleIncommingCall, handleCallAccepted]);

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

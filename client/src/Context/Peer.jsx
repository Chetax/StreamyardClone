import React, { useCallback, useEffect, useMemo, useState } from "react";

const PeerContex = React.createContext(null);
export const usePeer = () => React.useContext(PeerContex);

export const PeerProvider = (props) => {

   const peer = useMemo(() => new RTCPeerConnection(), []);
  const [remoteStream,setRemotestream]=useState(null);


  const createOffer = async () => {

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      return offer;

  };

const creaeteAnswer=async(offer)=>
  {
    await peer.setRemoteDescription(offer);
    const answer=await peer.createAnswer();
    await peer.setLocalDescription(answer)
    return answer;
  }


  const setRemoteAnswer = async (ans) => {
      await peer.setRemoteDescription(ans);
  };

  const sendStream = async (stream) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      const sender = peer.getSenders().find(s => s.track === track);
      if (!sender) {
        peer.addTrack(track, stream);
      } else {
        console.warn(`Track already exists: ${track.kind}`);
      }
    }
  };
  
const handleTrackEvent=useCallback((e)=>{
    const streams=e.streams;
    setRemotestream(streams[0]);
},[remoteStream])




  useEffect(()=>{
    peer.addEventListener('track',handleTrackEvent);
  
    return ()=>{
      peer.removeEventListener('track',handleTrackEvent)
 
    }
  },[peer,handleTrackEvent]);




  return (
    <PeerContex.Provider value={{ peer, createOffer,creaeteAnswer,setRemoteAnswer,sendStream,remoteStream }}
    >
      {props.children}
    </PeerContex.Provider>
  );
};

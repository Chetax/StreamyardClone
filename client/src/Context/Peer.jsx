import React, { useMemo } from "react";

const PeerContex = React.createContext(null);
export const usePeer = () => React.useContext(PeerContex);

export const PeerProvider = (props) => {
 
  const peer = useMemo(() => new RTCPeerConnection(), []);

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
  return (
    <PeerContex.Provider value={{ peer, createOffer,creaeteAnswer,setRemoteAnswer }}
    >
      {props.children}
    </PeerContex.Provider>
  );
};

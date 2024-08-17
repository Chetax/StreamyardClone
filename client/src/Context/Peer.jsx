import React, { useMemo } from "react";

const PeerContex = React.createContext(null);
export const usePeer = () => React.useContext(PeerContex);

export const PeerProvider = (props) => {
 
  const peer = useMemo(() => new RTCPeerConnection({}), []);

  // Function to create an offer
  const createOffer = async () => {
    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  // Function to create an answer
  const createAnswer = async (offer) => {
    try {
      await peer.setRemoteDescription(offer);
      const ans = await peer.createAnswer();
      await peer.setLocalDescription(ans);
      return ans;
    } catch (error) {
      console.error("Error creating answer:", error);
    }
  };

  // Function to set the remote answer
  const setRemoteAnswer = async (ans) => {
    try {
      await peer.setRemoteDescription(ans);
    } catch (error) {
      console.error("Error setting remote answer:", error);
    }
  };

  return (
    <PeerContex.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer }}
    >
      {props.children}
    </PeerContex.Provider>
  );
};

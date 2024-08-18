import React, { useContext } from "react";
import { useMemo } from "react";
import {io} from 'socket.io-client'

export const SockeContext=React.createContext(null);
export const useScoket=()=>{
    return useContext(SockeContext)
}
export const  SocketProveider=(props)=>{
    const socket=useMemo(()=>io("http://localhost:8000"),[])
       return <SockeContext.Provider value={{socket}}>
           {props.children} 
        </SockeContext.Provider>
 }
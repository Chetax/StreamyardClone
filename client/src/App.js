import React from "react"

import {Routes,Route} from 'react-router-dom'
import Homepage from "./pages/Homepage"
import { SocketProveider } from "./Context/SocketProvider"
import { PeerProvider } from "./Context/Peer"
import Roompage from "./pages/Roompage"
const App=()=>{

  return(<>
      <SocketProveider>
        <PeerProvider>
     <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/room/:room" element={<Roompage/>}></Route>
     </Routes>
     </PeerProvider>
      </SocketProveider>
  </>)
}
export default App;
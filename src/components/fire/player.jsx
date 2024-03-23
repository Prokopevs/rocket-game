
import React from "react" 
import Sprite from "./sprite" 
import rezult  from "../assets/rezult.png" 
 
const Player = () => { 
  return ( 
      <Sprite 
        src={rezult} 
        states={9} 
        tile={{ width: 140, height: 110 }} 
        scale={3} 
        framesPerStep={9} 
      /> 
  ) 
} 
 
export default Player;

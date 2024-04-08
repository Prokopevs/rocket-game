
import Sprite from "./sprite" 
import { RocketFrameImg } from "../../pictures";
 
const Player: React.FC<{}> = () => {
  return ( 
      <Sprite 
        src={String(RocketFrameImg)}
        states={9} 
        tile={{ width: 66, height: 179 }} 
        scale={0.6} 
        framesPerStep={8} 
      /> 
  ) 
} 
 
export default Player;


import Sprite from "./sprite" 
import { FireImg } from "../../pictures";
 
const Player: React.FC<{}> = () => {
  return ( 
      <Sprite 
        src={String(FireImg)}
        states={9} 
        tile={{ width: 140, height: 110 }} 
        scale={0.7} 
        framesPerStep={8} 
      /> 
  ) 
} 
 
export default Player;


import Sprite from "./sprite" 
import { RocketFrameImg } from "../../pictures";
 
interface ISpriteProps {
  rocketWidth: number,
  rocketHeight: number,
  framerocketwidth: number,
  pause: boolean,
}

const Player: React.FC<ISpriteProps> = ({ rocketWidth, rocketHeight, framerocketwidth, pause }) => {
  return ( 
      <Sprite 
        src={String(RocketFrameImg)}
        states={9} 
        tile={{ width: rocketWidth, height: rocketHeight}} 
        scale={1} 
        framesPerStep={8} 
        framerocketwidth = {framerocketwidth}
        pause = {pause}
      /> 
  ) 
} 
 
export default Player;

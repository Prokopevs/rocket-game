
import Sprite from "./sprite" 
import { RocketFrameImg } from "../../pictures";
 
interface ISpriteProps {
  rocketWidth: number,
  rocketHeight: number,
  frameRocketWidth: number,

}

const Player: React.FC<ISpriteProps> = ({ rocketWidth, rocketHeight, frameRocketWidth }) => {
  return ( 
      <Sprite 
        src={String(RocketFrameImg)}
        states={9} 
        tile={{ width: rocketWidth, height: rocketHeight}} 
        scale={0.6} 
        framesPerStep={8} 
        frameRocketWidth = {frameRocketWidth}
      /> 
  ) 
} 
 
export default Player;

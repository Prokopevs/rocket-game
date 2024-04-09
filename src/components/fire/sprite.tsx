import React from "react"
import Tile from "./tile"
 
interface ISpriteProps {
  src: string,
  states: number,
  tile: { width: number, height: number },
  scale: number,
  framesPerStep: number,
  framerocketwidth: number,
  pause: boolean,
}

const Sprite: React.FC<ISpriteProps> = ({ src, states, tile, scale, framesPerStep, framerocketwidth, pause }) => { 
  const tick = React.useRef(0) 
  const [state, setState] = React.useState(0) 
  const frame = React.useRef<number | null>(null)
 
  const animate = () => { 
    if (tick.current === framesPerStep) { 
      tick.current = 0 
      setState((state) => (state + 1) % states) 
    } 
    tick.current = tick.current + 1 
 
    frame.current = requestAnimationFrame(animate) 
  }
 
  React.useEffect(() => { 
    frame.current = requestAnimationFrame(animate)

    return () => { 
      if (frame.current) {
        cancelAnimationFrame(frame.current)
      }
    }
  }, [])
 
  return ( 
    <> 
      <Tile src={src} state={state} tile={tile} scale={scale} framerocketwidth={framerocketwidth} pause = {pause} /> 
    </> 
  ); 
}; 
 
export default Sprite;
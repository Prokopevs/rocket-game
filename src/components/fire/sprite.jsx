import React, { useEffect, useState } from "react"; 
import Tile from "./tile"; 
 
const Sprite = ({ src, tile, scale, states, framesPerStep }) => { 
  const tick = React.useRef(0) 
  const [state, setState] = useState(0) 
  const frame = React.useRef(null) 
 
  const animate = () => { 
    if (tick.current === framesPerStep) { 
      tick.current = 0 
      setState((state) => (state + 1) % states) 
    } 
    tick.current = tick.current + 1 
 
    frame.current = requestAnimationFrame(animate) 
  }; 
  console.log((state + 1) % states) 
 
  useEffect(() => { 
    animate() 
    return () => { 
      cancelAnimationFrame(frame.current); 
    }; 
  }, []); 
 
  return ( 
    <> 
      <Tile src={src} state={state} tile={tile} scale={scale} /> 
    </> 
  ); 
}; 
 
export default Sprite;
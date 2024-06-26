import styled from "styled-components";

const Container = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
  transform: scale(${({ scale }) => `${scale}, ${scale}`});
  transform-origin: top left;
  left: 20px
`;

const Image = styled.img`
  transform: translate(-${({ left }) => left}px, 0);
  width: ${({ framerocketwidth }) => framerocketwidth}px;
`;

const Tile = ({ src, tile, scale, state, framerocketwidth, pause }) => { 
    let left
    if (pause === true) {
      left = 0
    } else {
      left = tile.width * state
    }
    
    return (
      <Container width={tile.width} height={tile.height}>
        <Image src={src} left={left} framerocketwidth={framerocketwidth}/>
      </Container>
    );
}

export default Tile;
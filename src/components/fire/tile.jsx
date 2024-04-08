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
`;

const Tile = ({ src, tile, scale, state }) => { 
    const left = tile.width * state;

    return (
      <Container width={tile.width} height={tile.height}>
        <Image src={src} left={left} />
      </Container>
    );
}

export default Tile;
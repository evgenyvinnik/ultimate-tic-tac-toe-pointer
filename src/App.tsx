import React, { useEffect, useState } from "react";

import "./css/App.css";
import { useWindowSize } from "./hooks/use-window-size";
import { Cursor } from "./Cursor";
import { useDebouncedPosition } from "./hooks/use-debounced-position";
import { useClosestGridImage } from "./hooks/use-closest-grid-image";
import { isMouse } from "./utils";
import styled from "styled-components";

import Game from "./Game";

const App: React.FC = () => {
  const windowSize = useWindowSize();

  const [bind, position, mousePosition] = useDebouncedPosition();
  const [image, style] = useClosestGridImage(position);

  const [displayImage, setDisplayImage] = useState<
    HTMLImageElement | undefined
  >(undefined);
  const [displayStyle, setDisplayStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);
  useEffect(() => {
    if (image != null && style != null) {
      setDisplayImage(image);
      setDisplayStyle(style);
    }
  }, [image, style]);

  return (
    <>
      <div
        className="Interactions"
        style={{
          width: windowSize.x,
          height: windowSize.y,
        }}
        {...bind()}
      />
      <div
        className="App"
        style={{
          width: windowSize.x,
          height: windowSize.y,
        }}
      >
        {/* {!isMouse && mousePosition ? <Cursor position={mousePosition} /> : null}
        {displayImage ? (
          <div style={{ position: "absolute" }}>
            <img
              style={displayStyle}
              alt="someone pointing at your pointer"
              key={displayImage.src}
              src={displayImage.src}
            />
          </div>
        ) : null} */}
        {/* <Container>
          <Game />
        </Container> */}
      </div>
    </>
  );
};

// TODO: tornar responsivo
const Container = styled("div")`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: "Helvetica", Futura, sans-serif;
  --square-size: 65px; /* FIXME: qualquer mudança requer mudanças nas fontes dos botoes */
`;

export default App;

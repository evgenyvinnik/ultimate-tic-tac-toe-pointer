import React from "react";

import "./css/App.css";
import { useWindowSize } from "./hooks/use-window-size";
import { Loading } from "./Loading";
import { Cursor } from "./Cursor";
import { useDebouncedPosition } from "./hooks/use-debounced-position";
import { useClosestGridImage } from "./hooks/use-closest-grid-image";
import { isMouse } from "./utils";

const App: React.FC = () => {
  const windowSize = useWindowSize();

  const [bind, position, mousePosition] = useDebouncedPosition();
  const [image, style] = useClosestGridImage(position);
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
          // transform: 'scale(0.5)',
        }}
      >
        {!isMouse && mousePosition ? <Cursor position={mousePosition} /> : null}
        {image ? (
          <>
            <div style={{ position: "absolute", transform: "scale(1.1)" }}>
              <img
                style={{ ...style, filter: "blur(8px)" }}
                alt="someone pointing at your pointer"
                key={image.src}
                src={image.src}
              />
            </div>
            <div style={{ position: "absolute" }}>
              <img
                style={style}
                alt="someone pointing at your pointer"
                key={image.src}
                src={image.src}
              />
            </div>
          </>
        ) : (
          <Loading position={mousePosition} />
        )}
      </div>
    </>
  );
};

export default App;

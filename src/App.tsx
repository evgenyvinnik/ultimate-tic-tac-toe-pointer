import React from "react";

import "./css/App.css";
import { useWindowSize } from "./hooks/use-window-size";
import { Cursor } from "./Cursor";
import { useDebouncedPosition } from "./hooks/use-debounced-position";
import { useClosestGridImage } from "./hooks/use-closest-grid-image";
import { isMouse } from "./utils";

const App: React.FC = () => {
  const windowSize = useWindowSize();

  const [bind, position, mousePosition] = useDebouncedPosition();
  const [gridImage] = useClosestGridImage(position);

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
        {!isMouse && mousePosition ? <Cursor position={mousePosition} /> : null}
        {gridImage?.image ? (
          <div style={{ position: "absolute" }}>
            <img
              style={gridImage?.style}
              alt="someone pointing at your pointer"
              key={gridImage?.image.src}
              src={gridImage?.image.src}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default App;

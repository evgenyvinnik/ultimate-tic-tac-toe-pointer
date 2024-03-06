import React, { useEffect, useState } from "react";

import "./css/App.css";
import { useWindowSize } from "./hooks/use-window-size";
import { Cursor } from "./Cursor";
import { useDebouncedPosition } from "./hooks/use-debounced-position";
import { useClosestGridImage } from "./hooks/use-closest-grid-image";
import { isMouse } from "./utils";

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
        {!isMouse && mousePosition ? <Cursor position={mousePosition} /> : null}
        {displayImage ? (
          <div style={{ position: "absolute" }}>
            <img
              style={displayStyle}
              alt="someone pointing at your pointer"
              key={displayImage.src}
              src={displayImage.src}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default App;

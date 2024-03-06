import React from "react";
import { useDebounce } from "./hooks/use-debounce";
import { Point } from "./Point";
import { isMouse } from "./utils";

export const Loading: React.FC<{ position?: Point }> = ({ position }) => {
  const pointing = useDebounce(position, 200);
  return (
    <div className={`Loading ${position ? "mod-loader" : ""}`}>
      <div>
        {!position
          ? isMouse
            ? "Please move your pointer"
            : "Please tap on the screen"
          : pointing
          ? "Pointer located. Pointing..."
          : "Finding pointer... Please\u00a0hold\u00a0still."}
      </div>
    </div>
  );
};

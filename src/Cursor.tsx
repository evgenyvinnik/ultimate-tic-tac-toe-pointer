import React from "react";
import { Point } from "./Point";

export const Cursor: React.FC<{ position: Point }> = ({ position }) => (
  <div
    style={{
      zIndex: 2000,
      position: "absolute",
      transform: `translate(${position.x - 3}px, ${position.y - 4}px)`,
    }}
  >
    <img
      src="./ultimate-tic-tac-toe-pointer/cursor.png"
      width="15"
      alt="pointer"
    />
  </div>
);

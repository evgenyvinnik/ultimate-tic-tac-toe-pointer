import React, { useState } from "react";

import "./css/App.css";
import { useWindowSize } from "./hooks/use-window-size";
import { Cursor } from "./Cursor";
import { useDebouncedPosition } from "./hooks/use-debounced-position";
import { useClosestGridImage } from "./hooks/use-closest-grid-image";
import { isMouse } from "./utils";

import Header from "./header";
import BigBoard from "./bigBoard";
import WelcomeMenu from "./menus/welcomeMenu.js";
import AiMenu from "./menus/aiMenu.js";

const App: React.FC = () => {
  const windowSize = useWindowSize();

  const [bind, position, mousePosition] = useDebouncedPosition();
  const [gridImage] = useClosestGridImage(position);

  const [reset, setReset] = useState(0);
  const [robot, setRobot] = useState(2);
  const [status, setStatus] = useState("welcomeMenu");
  const [playerIsX, setPlayerIsX] = useState(true);

  function resetBoard() {
    setReset(reset + 1);
  }

  function statusUpdate(newStatus: React.SetStateAction<string>) {
    setStatus(newStatus);
  }

  function togglePlayerisX() {
    setPlayerIsX(!playerIsX);
  }

  function robotMenuClick(robotLevel: React.SetStateAction<number>) {
    setRobot(robotLevel);
    setStatus("aiGame");
  }
  let children = [];
  switch (status) {
    case "welcomeMenu":
      children.push(<WelcomeMenu setStatus={statusUpdate} />);
      break;
    case "aiMenu":
      children.push(
        <AiMenu
          togglePlayerisX={togglePlayerisX}
          playerIsX={playerIsX}
          robotMenuClick={robotMenuClick}
        />
      );
      break;
    default:
      children.push(
        <BigBoard
          robot={robot}
          key={reset}
          appStatus={status}
          playerIsX={playerIsX}
        />
      );
      break;
  }

  return (
    <>
      <div
        className="App"
        style={{
          width: windowSize.x,
          height: windowSize.y,
        }}
      >
        <div
          className="Interactions"
          style={{
            width: windowSize.x,
            height: windowSize.y,
            pointerEvents: "all",
          }}
          {...bind()}
        />
        {!isMouse && mousePosition ? <Cursor position={mousePosition} /> : null}

        {gridImage?.image ? (
          <div style={{ position: "absolute", pointerEvents: "none" }}>
            <img
              style={gridImage?.style}
              alt="someone pointing at your pointer"
              key={gridImage?.image.src}
              src={gridImage?.image.src}
            />
          </div>
        ) : null}
        <div className="container">
          <Header setStatus={statusUpdate} welcome={status === "welcomeMenu"} />
          {children}
        </div>
      </div>
    </>
  );
};

export default App;

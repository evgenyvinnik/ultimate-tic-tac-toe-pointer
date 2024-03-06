import React, { useState } from "react";
// import "./App.css";

export default function App() {
  //   function loadImage(URL, retries = 5) {
  //     var img = new Image();
  //     img.onerror = () => {
  //       if (retries > 0){
  //         loadImage(URL, retries -1);
  //       } else {
  //         alert('image not found');
  //       }
  //     }
  //     img.src = URL;
  // }
  const [counter, setCounter] = useState(0);
  async function downloadImage(imageSrc: string, imageName: string) {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const onClick = async () => {
    setCounter(counter + 10);
    for (let i = counter; i < counter + 10; i++) {
      let imageName = `${i}.jpg`;
      await downloadImage(
        `https://pointerpointer.com/images/${imageName}`,
        imageName
      );
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClick}>Download images</button>
      </header>
    </div>
  );
}
// import React from "react";

// import "./css/App.css";
// import { useWindowSize } from "./hooks/use-window-size";
// import { Loading } from "./Loading";
// import { Cursor } from "./Cursor";
// import { useDebouncedPosition } from "./hooks/use-debounced-position";
// import { useClosestGridImage } from "./hooks/use-closest-grid-image";
// import { isMouse } from "./utils";

// const App: React.FC = () => {
//   const windowSize = useWindowSize();

//   const [bind, position, mousePosition] = useDebouncedPosition();
//   const [image, style] = useClosestGridImage(position);
//   return (
//     <>
//       <div
//         className="Interactions"
//         style={{
//           width: windowSize.x,
//           height: windowSize.y,
//         }}
//         {...bind()}
//       />
//       <div
//         className="App"
//         style={{
//           width: windowSize.x,
//           height: windowSize.y,
//           // transform: 'scale(0.5)',
//         }}
//       >
//         {!isMouse && mousePosition ? <Cursor position={mousePosition} /> : null}
//         {image ? (
//           <>
//             <div style={{ position: "absolute", transform: "scale(1.1)" }}>
//               <img
//                 style={{ ...style, filter: "blur(8px)" }}
//                 alt="someone pointing at your pointer"
//                 key={image.src}
//                 src={image.src}
//               />
//             </div>
//             <div style={{ position: "absolute" }}>
//               <img
//                 style={style}
//                 alt="someone pointing at your pointer"
//                 key={image.src}
//                 src={image.src}
//               />
//             </div>
//           </>
//         ) : (
//           <Loading position={mousePosition} />
//         )}
//       </div>
//     </>
//   );
// };

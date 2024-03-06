import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
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

  const onClick = () => {
    for (let i = 0; i < 1000; i++) {
      let imageName = `${i}.jpg`;
      downloadImage(
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

export default App;

import { useState, useEffect } from "react";

type ImageLoad = {
  image?: HTMLImageElement;
  status: "loading" | "loaded" | "failed";
};

const defaultValue: ImageLoad = { image: undefined, status: "loading" };
export const useImage = (src?: string) => {
  const [{ image, status }, setState] = useState<ImageLoad>(defaultValue);

  useEffect(() => {
    if (!src) return;
    const image = document.createElement("img");

    const onload = () => {
      setState({ image, status: "loaded" });
    };

    const onerror = () => {
      setState({ image: undefined, status: "failed" });
    };

    image.addEventListener("load", onload);
    image.addEventListener("error", onerror);
    image.src = src;

    return () => {
      image.removeEventListener("load", onload);
      image.removeEventListener("error", onerror);
      setState(defaultValue);
    };
  }, [src]);

  return [image, status] as [
    HTMLImageElement | undefined,
    "loading" | "loaded" | "failed"
  ];
};

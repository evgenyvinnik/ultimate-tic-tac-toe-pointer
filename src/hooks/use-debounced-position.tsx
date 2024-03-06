import { useState, useEffect } from "react";
import { Point } from "../Point";
import { isMouse } from "../utils";
import { useMove, useDrag } from "react-use-gesture";
import { useDebounce } from "./use-debounce";

export const useDebouncedPosition = () => {
  const [left, setLeft] = useState(false);
  const [position, setPosition] = useState<Point | undefined>();

  useEffect(() => {
    document.addEventListener("mouseleave", () => setLeft(true));
    document.addEventListener("mouseenter", () => setLeft(false));
  }, []);

  const bind = (isMouse ? useMove : useDrag)(({ xy: [x, y] }) => {
    setPosition({ x: x, y });
  });
  const debouncedPosition = useDebounce(position, 20);
  return [bind, debouncedPosition, !left ? position : undefined] as [
    typeof bind,
    typeof debouncedPosition,
    typeof position
  ];
};

import { CSSProperties, useEffect, useState } from "react";

import {
  Point,
  multiplyPoints,
  pointFromSize,
  dividePoints,
  subtractPoints,
  multiplyPointByNumber,
  pointToCSSTransform,
  addPoints,
  fitSize,
} from "../Point";
import { useClosest } from "../closest";
import { useWindowSize } from "./use-window-size";
import positionsJson from "../new-positions.json";
import { images } from "../assets/images";

const fetchPositions: Point[] = positionsJson.map(([x, y]) => ({ x, y }));

export const useClosestGridImage = (absolutePosition?: Point) => {
  const [style, setStyle] = useState<CSSProperties | undefined>();
  const windowSize = useWindowSize();
  const positions = fetchPositions;

  const [imageIndex, pointPosition] = useClosest(
    windowSize,
    absolutePosition,
    positions
  );

  const image = ((index: number | undefined) => {
    if (index != null) {
      const image = new Image();
      image.src = (images as any)[index] as any;
      return image;
    }
    return null;
  })(imageIndex);

  useEffect(() => {
    if (!image || !absolutePosition || !pointPosition) {
      setStyle(undefined);
      return;
    }
    const position = dividePoints(absolutePosition, windowSize);
    const origin = multiplyPointByNumber(pointPosition, 100);
    const imageSize = pointFromSize(image);
    const resizedImageSize = fitSize(imageSize, windowSize);
    const translate = multiplyPointByNumber(
      multiplyPoints(subtractPoints(resizedImageSize, windowSize), position),
      -1
    );
    const adjustment = multiplyPoints(
      subtractPoints(position, pointPosition),
      resizedImageSize
    );
    setStyle({
      width: `${resizedImageSize.x}px`,
      height: `${resizedImageSize.y}px`,
      transform: translate
        ? `${pointToCSSTransform(
            addPoints(translate, adjustment),
            "translate",
            "px"
          )} scale(1.2)`
        : undefined,
      transformOrigin: `${origin.x}% ${origin.y}%`,
    });
  }, [windowSize, pointPosition, image, absolutePosition]);
  return [image, style] as [typeof image, typeof style];
};

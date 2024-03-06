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

export type GridImage = {
  style: CSSProperties | undefined;
  image: HTMLImageElement | undefined;
};

export const useClosestGridImage = (absolutePosition?: Point) => {
  const [gridImage, setGridImage] = useState<GridImage | undefined>();
  const windowSize = useWindowSize();

  const [imageIndex, pointPosition] = useClosest(
    windowSize,
    absolutePosition,
    fetchPositions
  );

  useEffect(() => {
    if (!!imageIndex && !!absolutePosition && !!pointPosition) {
      const loadImage = new Image();
      loadImage.src = (images as any)[imageIndex] as any;
      loadImage.onload = function () {
        const position = dividePoints(absolutePosition, windowSize);
        const origin = multiplyPointByNumber(pointPosition, 100);
        const imageSize = pointFromSize(loadImage);
        const resizedImageSize = fitSize(imageSize, windowSize);
        const translate = multiplyPointByNumber(
          multiplyPoints(
            subtractPoints(resizedImageSize, windowSize),
            position
          ),
          -1
        );
        const adjustment = multiplyPoints(
          subtractPoints(position, pointPosition),
          resizedImageSize
        );

        setGridImage({
          style: {
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
          },
          image: loadImage,
        });
      };
    }
  }, [absolutePosition, imageIndex, pointPosition, windowSize]);
  return [gridImage];
};

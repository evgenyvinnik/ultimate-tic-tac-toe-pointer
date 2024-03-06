import { Point, distancePoints, dividePoints } from './Point';
import { useState, useEffect } from 'react';

const lastPicked : number[] = [];

const bruteClosest = (position: Point, positions: Point[]) => {
  let index = undefined;
  let closest = Number.MAX_VALUE;
  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const distance = distancePoints(pos, position);
    if (distance < closest && !lastPicked.includes(i)) {
      closest = distance;
      index = i;
    };
  }
  lastPicked.unshift(index!);
  lastPicked.length = Math.min(lastPicked.length, 4);
  return index;
};

export const useClosest = (
  size: Point,
  absolutePosition?: Point,
  positions?: Point[]
) => {
  const [closest, setClosest] = useState<number | undefined>();
  useEffect(() => {
    if (!absolutePosition || !positions) {
      setClosest(undefined);
      return;
    }
    const position = dividePoints(absolutePosition, size);
    const closest = bruteClosest(position, positions);
    setClosest(closest);
  }, [positions, absolutePosition, size]);
  return [
    closest,
    !!positions && closest !== undefined ? positions[closest] : undefined
  ] as [number | undefined, Point | undefined];
};

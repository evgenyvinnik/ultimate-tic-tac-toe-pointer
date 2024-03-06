export type Point = {
  x: number;
  y: number;
};

export const distancePoints = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point
) => (x1 - x2) ** 2 + (y1 - y2) ** 2;

export const dividePoints = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point
) => ({
  x: x1 / x2,
  y: y1 / y2
});

export const dividePointByNumber = ({ x, y }: Point, number: number) => ({
  x: x / number,
  y: y / number
});

export const multiplyPointByNumber = ({ x, y }: Point, number: number) => ({
  x: x * number,
  y: y * number
});

export const multiplyPoints = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point
) => ({
  x: x1 * x2,
  y: y1 * y2
});

export const addPoints = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point
) => ({
  x: x1 + x2,
  y: y1 + y2
});

export const subtractPoints = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point
) => ({
  x: x1 - x2,
  y: y1 - y2
});

export const remainderPoints = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point
) => ({
  x: x1 % x2,
  y: y1 % y2
});

export const pointFromSize = ({
  width: x,
  height: y
}: {
  width: number;
  height: number;
}) => ({
  x,
  y
});

export const pointToCSSTransform = (
  { x, y }: Point,
  type: string,
  unit: string | undefined = 'px'
) => `${type}(${x}${unit}, ${y}${unit})`;

export const fitSize = (
  { x: width, y: height }: Point,
  { x: containerWidth, y: containerHeight }: Point,
  fill: boolean | undefined = true
) => {
  const itemRatio = height / width;
  const rectRatio = containerHeight / containerWidth;
  const scale = (fill
  ? itemRatio > rectRatio
  : itemRatio < rectRatio)
    ? containerWidth / width
    : containerHeight / height;
  return {
    x: width * scale,
    y: height * scale
  };
};

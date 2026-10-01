declare module 'react-simple-maps';

declare module 'd3-scale' {
  export function scaleQuantize<T = number>(): {
    domain(domain: [number, number]): this;
    range(range: T[]): this;
    (value: number): T;
  };
}

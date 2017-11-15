// @flow

/**
 * Hi Res time in seconds
 */
export const hiResTime = (): number => performance.now();

export type Point = {
  x: number,
  y: number,
};

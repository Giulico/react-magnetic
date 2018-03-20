import * as I from './interfaces';

/**
 * Get a pair of coords and a bound of the element, return if the coords are within the bound
 */
export const isCollided = (
    coords: {x: number, y: number},
    bounds: {top: number, left: number, bottom: number, right: number, width: number, height: number}
) =>
    (coords.x >= bounds.left) && (coords.x <= bounds.right) && (coords.y >= bounds.top) && (coords.y <= bounds.bottom);

/**
 * Take a Rect object and return a plane object
 */
export const bounds = (element: HTMLElement): I.Bounds => {
    const {top, right, bottom, left, width, height, x, y} = element.getBoundingClientRect();
    return {top, right, bottom, left, width, height, x, y};
};
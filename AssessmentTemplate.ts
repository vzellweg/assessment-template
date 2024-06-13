import * as THREE from "three";
/**
 * Implement the following functions. You may use three.js, but
 * do not use an objects derived from Object3D. Limit yourself
 * to the basic linear math objects such as Vector2, Vector3,
 * and Matrix4.
 */

/**
 * 2D Point
 */
export type Point2D = {
  x: number;
  y: number;
};

/**
 * 2D Polygon
 */
export type Polygon2D = Point2D[];

/**************************************************
 * Exercise: Compute the signed area of a polygon *
 **************************************************/
export type GetPolygonAreaFunction = (p: Polygon2D) => number;

/********************************************
 * Exercise: Compute the polygon handedness *
 ********************************************/
export type GetPolygonOrientation = (
  p: Polygon2D,
) => "RightHanded" | "LeftHanded" | undefined;

/**
 * 3D Point
 */
export type Point3D = Point2D & {
  z: number;
};

/**
 * 3D Polygon
 */
type Polygon3D = Point3D[];

type UnitVector3D = Point3D; // for clarity

/**
 * Input arguments for extrude function
 */
export type ExtrudeArgs = {
  /**
   * Polygon to extrude, no duplicated points
   * (building footprint)
   */
  polygon: Polygon2D;

  /**
   * Distance to extrude
   * (building height)
   */
  distance: number;
};

/**
 * The expected result of the extrude function
 * (building footprint with walls and flat roof)
 */
type ExtrudeResult = {
  /**
   * caps[0]: bottom face (pointing down)
   * caps[1]: top face (pointing up)
   */
  caps: Polygon3D[];
  /**
   * lateral faces should point outward
   */
  lateralFaces: Polygon3D[];
};

/************************************************
 * Exercise: Extrude a 2D polygon along z for a *
 * specified distance                           *
 ************************************************/
export type ExtrudeFunction = (args: ExtrudeArgs) => ExtrudeResult;

/**
 * The expected result of the extrude to plane function
 * (building footprint with walls and pitched roof)
 */
export type ExtrudeToPlaneArgs = ExtrudeArgs & {
  /**
   * The plane to stop the extrude on
   * (roof normal)
   */
  stopPlaneNormal: UnitVector3D;
};

/************************************************
 * Exercise: Extrude a 2D polygon along z for a *
 * specified distance, stopping at a specified  *
 * plane.                                       *
 ************************************************/
export type ExtrudeToPlaneFunction = (
  args: ExtrudeToPlaneArgs,
) => ExtrudeResult;

/**
 * Exercise: Given three points A, B and C, find the point on line segment
 * AB that is nearest to C.
 */
export function nearestPointOnLineSegment(
  A: Point2D,
  B: Point2D,
  C: Point2D,
): Point2D {
  const AB = new THREE.Vector2(B.x - A.x, B.y - A.y);
  const AC = new THREE.Vector2(C.x - A.x, C.y - A.y);

  const ABDotAC = AB.dot(AC);
  // A vectors dot of itself is the square of its length
  const ABDotAB = AB.dot(AB);

  // Scalar projection of AC onto AB
  let t = ABDotAC / ABDotAB;
  // Clamp t to be within the segment AB
  // - if t is less than 0, the closest point is A
  // - if t is greater than 1, the closest point is B
  t = Math.max(0, Math.min(1, t));

  // Closest point on AB
  return {
    x: A.x + t * AB.x,
    y: A.y + t * AB.y,
  };
}

import { nearestPointOnLineSegment, Point2D } from "./AssessmentTemplate";
import { describe, test, expect } from "@jest/globals";

describe("nearestPoint on line segment AB to C", () => {
  test("closest point is C", () => {
    const A = { x: 0, y: 0 };
    const B = { x: 4, y: 0 };
    const C = { x: 3, y: 0 };

    expect(nearestPointOnLineSegment(A, B, C)).toEqual(C);
  });
  test("closest point is A", () => {
    const A = { x: 0, y: 0 };
    const B = { x: 4, y: 0 };
    const C = { x: -1, y: 0 };

    expect(nearestPointOnLineSegment(A, B, C)).toEqual(A);
  });
  test("closest point is on the segment", () => {
    const A: Point2D = { x: 0, y: 0 };
    const B: Point2D = { x: 4, y: 4 };
    const C: Point2D = { x: 3, y: 0 };

    // Test values generated from ChatGPT
    const expected: Point2D = { x: 1.5, y: 1.5 };

    expect(nearestPointOnLineSegment(A, B, C)).toEqual(expected);
  });
});

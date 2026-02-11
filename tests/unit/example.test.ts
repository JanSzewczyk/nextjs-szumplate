import { describe, expect, test } from "vitest";

function sum(a: number, b: number): number {
  return a + b;
}

describe("sum", () => {
  test("adds two positive numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  test("adds zero", () => {
    expect(sum(0, 5)).toBe(5);
  });
});

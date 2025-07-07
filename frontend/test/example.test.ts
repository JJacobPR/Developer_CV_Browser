import { expect, test } from "vitest";

test("Expect true to be true", () => {
  expect(true).toBe(true);
});

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

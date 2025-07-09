import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import usePagination from "../../../frontend/src/hooks/usePagination";

describe("usePagination", () => {
  const items = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`);
  const itemsPerPage = 5;

  it("should initialize with page 1 and correct items", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.maxPage).toBe(3);
    expect(result.current.currentItems).toEqual(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);
  });

  it("should go to next page", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.next();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual(["Item 6", "Item 7", "Item 8", "Item 9", "Item 10"]);
  });

  it("should not go past max page", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.jump(3);
      result.current.next();
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentItems).toEqual(["Item 11", "Item 12", "Item 13", "Item 14", "Item 15"]);
  });

  it("should go to previous page", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.jump(3);
      result.current.prev();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual(["Item 6", "Item 7", "Item 8", "Item 9", "Item 10"]);
  });

  it("should not go below page 1", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.prev();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("should not go above page 3", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.jump(3);
    });

    act(() => {
      result.current.next();
    });

    expect(result.current.currentPage).toBe(3);
  });

  it("should jump to specific page within bounds", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.jump(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual(["Item 6", "Item 7", "Item 8", "Item 9", "Item 10"]);
  });

  it("should clamp jump below 1 to page 1", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.jump(0);
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("should clamp jump above max to max page", () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.jump(10);
    });

    expect(result.current.currentPage).toBe(3);
  });
});

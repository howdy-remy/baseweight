// This file was generated using GitHub Copilot

import { renderHook, act } from "@testing-library/react";
import useScreenSize from "./useScreenSize";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("useScreenSize", () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    // Mock initial window dimensions
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1024,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      value: 768,
    });
  });

  afterEach(() => {
    // Restore original window dimensions
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      value: originalInnerHeight,
    });
  });

  it("returns the initial screen size", () => {
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it("updates screen size on window resize", () => {
    const { result } = renderHook(() => useScreenSize());

    act(() => {
      // Simulate window resize
      window.innerWidth = 1280;
      window.innerHeight = 720;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 1280, height: 720 });
  });

  it("cleans up the resize event listener on unmount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useScreenSize());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });
});

import { fireEvent, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useOutsideClick from "./useOutsideClick";

describe("useOutsideClick", () => {
  let callback: ReturnType<typeof vi.fn>;
  let container: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  beforeEach(() => {
    // Reset the DOM
    document.body.innerHTML = "";

    // Create mock callback
    callback = vi.fn();

    // Create container element
    container = document.createElement("div");
    container.setAttribute("data-testid", "container");
    document.body.appendChild(container);

    // Create element outside container
    outsideElement = document.createElement("div");
    outsideElement.setAttribute("data-testid", "outside");
    document.body.appendChild(outsideElement);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call callback when clicking outside the referenced element", () => {
    const { result } = renderHook(() => useOutsideClick(callback));

    // Attach the ref to our container
    if (result.current.current) {
      Object.defineProperty(result.current, "current", {
        value: container,
        writable: true,
      });
    }

    fireEvent.mouseDown(outsideElement);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call callback when clicking inside the referenced element", () => {
    const { result } = renderHook(() => useOutsideClick(callback));

    if (result.current.current) {
      Object.defineProperty(result.current, "current", {
        value: container,
        writable: true,
      });
    }

    fireEvent.mouseDown(container);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should remove event listener when component unmounts", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useOutsideClick(callback));

    unmount();

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should work with updated callback reference", () => {
    const { result, rerender } = renderHook(({ cb }) => useOutsideClick(cb), {
      initialProps: { cb: callback },
    });

    if (result.current.current) {
      Object.defineProperty(result.current, "current", {
        value: container,
        writable: true,
      });
    }

    const newCallback = vi.fn();

    rerender({ cb: newCallback });

    fireEvent.mouseDown(outsideElement);

    expect(callback).not.toHaveBeenCalled();
    expect(newCallback).toHaveBeenCalledTimes(1);
  });
});

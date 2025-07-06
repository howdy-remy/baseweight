import { useState, useEffect } from "react";

export const useDropdownPosition = (
  ref: React.RefObject<HTMLElement>,
  offset = 160,
) => {
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  useEffect(() => {
    const calculatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if the dropdown would overflow the viewport
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < offset && spaceAbove > offset) {
          setPosition("top");
        } else {
          setPosition("bottom");
        }
      }
    };

    calculatePosition();

    // Recalculate on window resize
    const handleResize = () => calculatePosition();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, offset]);

  return position;
};

import { IconButtonWrapper } from "./IconButton.styled";

export type IconButtonProps = {
  icon: "caretdown" | "chat" | "menu" | "star" | "x";
  variant: "primary" | "secondary";
};

export const IconButton = ({ icon, variant }: IconButtonProps) => {
  switch (icon) {
    case "caretdown":
      return (
        <IconButtonWrapper $variant={variant}>
          <img
            src={
              variant === "primary"
                ? "/icons/CaretDown-white.png"
                : "/icons/CaretDown-moss.png"
            }
          />
        </IconButtonWrapper>
      );
    case "chat":
      return (
        <IconButtonWrapper $variant={variant}>
          <img
            src={
              variant === "primary"
                ? "/icons/Chat-white.png"
                : "/icons/Chat-moss.png"
            }
          />
        </IconButtonWrapper>
      );
    case "menu":
      return (
        <IconButtonWrapper $variant={variant}>
          <img
            src={
              variant === "primary"
                ? "/icons/Menu-white.png"
                : "/icons/Menu-moss.png"
            }
          />
        </IconButtonWrapper>
      );
    case "star":
      return (
        <IconButtonWrapper $variant={variant}>
          <img
            src={
              variant === "primary"
                ? "/icons/Star-white.png"
                : "/icons/Star-moss.png"
            }
          />
        </IconButtonWrapper>
      );
    case "x":
      return (
        <IconButtonWrapper $variant={variant}>
          <img
            src={
              variant === "primary" ? "/icons/X-white.png" : "/icons/X-moss.png"
            }
          />
        </IconButtonWrapper>
      );
  }
};

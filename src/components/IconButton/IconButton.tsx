import { IconButtonWrapper } from "./IconButton.styled";

export type IconButtonProps = {
  icon: "caretdown" | "chat" | "menu" | "star" | "x";
  variant: "primary" | "secondary";
};

export const IconButton = ({ icon, variant }: IconButtonProps) => {
  switch (icon) {
    case "caretdown":
      return (
        <IconButtonWrapper $variant={variant} aria-label="caret-down">
          <img
            src={
              variant === "primary"
                ? "/icons/CaretDown-white.png"
                : "/icons/CaretDown-moss.png"
            }
            alt="caret-down icon"
          />
        </IconButtonWrapper>
      );
    case "chat":
      return (
        <IconButtonWrapper $variant={variant} aria-label="chat">
          <img
            src={
              variant === "primary"
                ? "/icons/Chat-white.png"
                : "/icons/Chat-moss.png"
            }
            alt="chat icon"
          />
        </IconButtonWrapper>
      );
    case "menu":
      return (
        <IconButtonWrapper $variant={variant} aria-label="menu">
          <img
            src={
              variant === "primary"
                ? "/icons/Menu-white.png"
                : "/icons/Menu-moss.png"
            }
            alt="menu icon"
          />
        </IconButtonWrapper>
      );
    case "star":
      return (
        <IconButtonWrapper $variant={variant} aria-label="star">
          <img
            src={
              variant === "primary"
                ? "/icons/Star-white.png"
                : "/icons/Star-moss.png"
            }
            alt="star icon"
          />
        </IconButtonWrapper>
      );
    case "x":
      return (
        <IconButtonWrapper $variant={variant} aria-label="x">
          <img
            src={
              variant === "primary" ? "/icons/X-white.png" : "/icons/X-moss.png"
            }
            alt="x icon"
          />
        </IconButtonWrapper>
      );
  }
};

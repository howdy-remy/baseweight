import { TextMonoBold } from "../Typography";
import { IconButtonWrapper } from "./IconButton.styled";

export type IconButtonProps = {
  as?: string;
  icon:
    | "caretdown"
    | "chat"
    | "menu"
    | "share"
    | "star"
    | "upload"
    | "x"
    | "+"
    | "-";
  variant: "primary" | "secondary";
  onClick?: (e: MouseEvent) => void;
  htmlFor?: string;
};

export const IconButton = ({
  as,
  htmlFor,
  icon,
  variant,
  onClick,
}: IconButtonProps) => {
  switch (icon) {
    case "caretdown":
      return (
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="caret-down"
        >
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
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="chat"
        >
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
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="menu"
        >
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
    case "share":
      return (
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="share"
        >
          <img
            src={
              variant === "primary"
                ? "/icons/Share-white.png"
                : "/icons/Share-moss.png"
            }
            alt="share icon"
          />
        </IconButtonWrapper>
      );
    case "star":
      return (
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="star"
        >
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
    case "upload":
      return (
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="upload"
        >
          <img
            src={
              variant === "primary"
                ? "/icons/Upload-white.png"
                : "/icons/Upload-moss.png"
            }
            alt="upload icon"
          />
        </IconButtonWrapper>
      );
    case "x":
      return (
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="x"
        >
          <img
            src={
              variant === "primary" ? "/icons/X-white.png" : "/icons/X-moss.png"
            }
            alt="x icon"
          />
        </IconButtonWrapper>
      );
    case "+":
      return (
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="x"
        >
          <TextMonoBold color="moss">+</TextMonoBold>
        </IconButtonWrapper>
      );
    case "-":
      return (
        <IconButtonWrapper
          as={as}
          htmlFor={htmlFor}
          onClick={onClick}
          $variant={variant}
          aria-label="x"
        >
          <TextMonoBold color="moss">-</TextMonoBold>
        </IconButtonWrapper>
      );
  }
};

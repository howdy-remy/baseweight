import { ReactNode } from "react";
import { StyledButton } from "./Button.styled";

export type ButtonProps = {
  as?: string;
  children: ReactNode;
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  expandWidth?: boolean;
  htmlFor?: string;
  onClick?: (event: MouseEvent) => void;
};

export const Button = ({
  as,
  children,
  variant,
  size = "medium",
  expandWidth,
  type,
  htmlFor,
  disabled,
  onClick,
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton
      htmlFor={htmlFor}
      as={as}
      $variant={variant}
      $size={size}
      type={type}
      disabled={disabled}
      $expandWidth={expandWidth}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

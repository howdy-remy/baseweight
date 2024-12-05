import { ButtonHTMLAttributes, ReactNode } from "react";
import { StyledButton } from "./Button.styled";

export type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  expandWidth?: boolean;
  onClick?: (event: MouseEvent) => void;
};

export const Button = ({
  children,
  variant,
  size = "medium",
  expandWidth,
  type,
  onClick,
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      type={type}
      $expandWidth={expandWidth}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

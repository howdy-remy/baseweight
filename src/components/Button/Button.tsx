import { ButtonHTMLAttributes, ReactNode } from "react";
import { StyledButton } from "./Button.styled";

export type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  expandWidth?: boolean;
};

export const Button = ({
  children,
  variant,
  size = "medium",
  expandWidth,
  type,
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      type={type}
      $expandWidth={expandWidth}
    >
      {children}
    </StyledButton>
  );
};

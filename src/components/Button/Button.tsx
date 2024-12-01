import { ReactNode } from "react";
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
}: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $size={size} $expandWidth={expandWidth}>
      {children}
    </StyledButton>
  );
};

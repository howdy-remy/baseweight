import type { ReactNode } from "react";
import { StyledSelect } from "./Select.styled";

export interface SelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  buttonSize: "small" | "medium" | "large";
  children: ReactNode;
  expandWidth?: boolean;
  variant: "primary" | "secondary";
}

export const Select = ({
  buttonSize,
  children,
  expandWidth,
  variant,
  ...rest
}: SelectProps) => {
  return (
    <StyledSelect
      {...rest}
      $expandWidth={expandWidth}
      $buttonSize={buttonSize}
      $variant={variant}
    >
      {children}
    </StyledSelect>
  );
};

import { Field as HeadlessField } from "@headlessui/react";
import { ReactNode } from "react";
import { StyledDescription, StyledLabel } from "./Field.styled";

type FieldProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

export const Field = ({ label, description, children }: FieldProps) => {
  return (
    <HeadlessField>
      <StyledLabel>{label}</StyledLabel>
      {description && <StyledDescription>{description}</StyledDescription>}
      {children}
    </HeadlessField>
  );
};

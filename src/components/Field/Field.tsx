import { Field as HeadlessField } from "@headlessui/react";
import { ReactNode } from "react";
import {
  LabelWrapper,
  StyledDescription,
  StyledField,
  StyledLabel,
} from "./Field.styled";

type FieldProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

export const Field = ({ label, description, children }: FieldProps) => {
  return (
    <StyledField>
      <LabelWrapper>
        <StyledLabel>{label}</StyledLabel>
        {description && <StyledDescription>{description}</StyledDescription>}
      </LabelWrapper>
      {children}
    </StyledField>
  );
};

import { StyledInput } from "./Input.styled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
}

export const Input = ({ isDisabled, name, ...rest }: InputProps) => {
  return <StyledInput {...rest} disabled={isDisabled} />;
};

import { StyledTextArea } from "./TextArea.styled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
}

export const TextArea = ({ isDisabled, name, ...rest }: InputProps) => {
  return <StyledTextArea {...rest} disabled={isDisabled} />;
};

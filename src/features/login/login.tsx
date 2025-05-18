import { FormEventHandler, useState } from "react";
import { supabase } from "lib/supabaseClient";

import { Field } from "components/Field";
import { Input } from "components/Input";
import { ActionsWrapper } from "components/Modal";
import { Button } from "components/Button";
import { TextSansBold, TextSerifRegular } from "components/Typography";
import { useToast } from "contexts/Toast";

import { LogoType } from "components/Layout/Layout.styled";
import { LoginWrapper, StyledForm, Wrapper } from "./login.styled";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      addToast(error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <Wrapper>
      <LoginWrapper>
        <LogoType as="h1">
          base<span>weight</span>
        </LogoType>
        <TextSerifRegular>
          No password needed! Sign in via magic link with your email below.
        </TextSerifRegular>
        {submitted ? (
          <TextSansBold>Check your email for the login link!</TextSansBold>
        ) : (
          <StyledForm onSubmit={handleLogin} role="form">
            <Field label="Email">
              <Input
                type="text"
                name="Email"
                value={email || ""}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <ActionsWrapper>
              <Button variant="primary" size="medium" type="submit">
                Send magic link
              </Button>
            </ActionsWrapper>
          </StyledForm>
        )}
      </LoginWrapper>
    </Wrapper>
  );
};

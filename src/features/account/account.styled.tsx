import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m}px;

  margin: ${({ theme }) => theme.spacing.xl}px;
`;

export const StyledForm = styled.form`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.spacing.m}px;

  max-width: 480px;
`;

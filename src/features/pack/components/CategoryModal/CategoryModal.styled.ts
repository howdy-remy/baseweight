import styled from "styled-components";

export const StyledForm = styled.form`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.spacing.m}px;
`;

export const FieldsWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.m}px;
  grid-template-columns: 1fr 50px;
`;

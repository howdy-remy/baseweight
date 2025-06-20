import styled from "styled-components";

export const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content 50%;
  gap: ${({ theme }) => theme.spacing.m}px;
`;

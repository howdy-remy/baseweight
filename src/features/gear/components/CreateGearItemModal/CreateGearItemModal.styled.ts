import styled from "styled-components";

export const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: ${({ theme }) => theme.spacing.m}px;
`;

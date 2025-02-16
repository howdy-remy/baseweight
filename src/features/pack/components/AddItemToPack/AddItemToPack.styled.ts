import styled from "styled-components";

export const ResultList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.m}px;
  grid-auto-flow: row;

  width: 100%;
  max-height: 160px;
  overflow-y: auto;

  padding: ${({ theme }) => theme.spacing.s}px;
  border-radius: ${({ theme }) => theme.spacing.s}px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const Result = styled.div`
  height: 28px;

  padding: ${({ theme }) => theme.spacing.s}px;
  border-radius: ${({ theme }) => theme.spacing.s}px;

  cursor: pointer;

  & > p {
    margin: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.flour};
  }
`;

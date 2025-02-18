import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ResultList = styled.div`
  position: absolute;

  display: grid;
  gap: ${({ theme }) => theme.spacing.m}px;
  grid-auto-flow: row;

  width: 100%;
  max-height: 160px;
  overflow-y: auto;

  margin-top: ${({ theme }) => theme.spacing.s}px;
  padding: ${({ theme }) => theme.spacing.s}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.spacing.s}px;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
`;

export const Result = styled.div`
  height: 28px;

  padding: ${({ theme }) => theme.spacing.s}px;
  border-radius: ${({ theme }) => theme.spacing.s}px;

  cursor: pointer;

  & > p {
    margin: 0;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.flour};
  }
`;

import styled from "styled-components";

export const ButtonWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing.xxl}px;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-left: ${({ theme }) => theme.spacing.xxl}px;
`;

export const ResultList = styled.div<{ $position?: "top" | "bottom" }>`
  position: absolute;

  display: grid;
  gap: ${({ theme }) => theme.spacing.m}px;
  grid-auto-flow: row;

  width: 100%;
  height: 160px;
  overflow-y: auto;

  margin: ${({ theme }) => `${theme.spacing.s}px 0`};
  padding: ${({ theme }) => theme.spacing.s}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.spacing.m}px;

  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); */
  box-shadow:
    rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;

  ${({ $position = "bottom" }) =>
    $position === "bottom"
      ? `
      top: 34px;
      bottom: auto;
    `
      : `
      top: auto;
      bottom: 34px;
    `}
`;

export const Result = styled.div`
  display: flex;
  align-items: center;

  height: 28px;
  width: 100%;

  padding: ${({ theme }) => theme.spacing.s}px;
  border-radius: ${({ theme }) => theme.spacing.s}px;

  cursor: pointer;

  & > p {
    display: block;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.flour};
  }
`;

export const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

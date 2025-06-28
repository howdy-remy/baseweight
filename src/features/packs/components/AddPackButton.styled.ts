import styled from "styled-components";

export const AddPackButton = styled.button`
  all: unset;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 160px;

  height: 240px;

  background-color: ${({ theme }) => theme.colors.moss};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.1s ease-in-out 0s;

  border-radius: ${({ theme }) => theme.spacing.l}px;
  font-family: "Rubik", serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.flour};
  font-weight: 600;

  text-decoration: none;

  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 544px) {
    width: calc(50vw - 36px);
  }
`;

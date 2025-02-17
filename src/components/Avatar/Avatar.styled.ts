import styled from "styled-components";

export const AvatarImage = styled.img<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: 50%;

  object-fit: cover;
`;

export const AvatarNoImage = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.stone};
  color: ${({ theme }) => theme.colors.black};
`;

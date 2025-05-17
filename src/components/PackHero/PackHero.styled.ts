import styled from "styled-components";

export const HeroWrapper = styled.div`
  position: relative;

  & > label {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;

export const Buttons = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.s}px;
  right: ${({ theme }) => theme.spacing.s}px;

  display: flex;
  gap: ${({ theme }) => theme.spacing.s}px;
`;

export const Hero = styled.img`
  width: 100%;
  height: 160px;

  object-fit: cover;
  object-position: center;
`;

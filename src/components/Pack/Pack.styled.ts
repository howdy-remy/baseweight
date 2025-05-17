import styled from "styled-components";
import { Link } from "react-router";

export const PacksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl}px;

  margin: ${({ theme }) => theme.spacing.xl}px;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const PackWrapper = styled.div`
  width: 160px;
  height: 240px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.1s ease-in-out 0s;

  border-radius: ${({ theme }) => theme.spacing.l}px;
  text-decoration: none;

  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const Hero = styled.img`
  width: 100%;
  height: 50%;

  object-fit: cover;
  object-position: center;
`;

export const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.m}px;
`;

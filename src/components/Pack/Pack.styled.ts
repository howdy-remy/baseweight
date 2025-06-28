import styled from "styled-components";
import { Link } from "react-router";
import { TextSansBold } from "components/Typography";

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const PackWrapper = styled.div`
  width: 160px;
  height: 240px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.25s ease-in-out 0s;

  border-radius: ${({ theme }) => theme.spacing.l}px;
  text-decoration: none;

  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 544px) {
    width: calc(50vw - 36px);
  }
`;

export const Hero = styled.img`
  width: 100%;
  height: 50%;

  object-fit: cover;
  object-position: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 50%;
  padding: ${({ theme: { spacing } }) =>
    `${spacing.m}px ${spacing.m}px ${spacing.l}px`};
`;

export const Title = styled(TextSansBold)`
  display: -webkit-box;

  height: 65px;
  overflow: hidden;

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

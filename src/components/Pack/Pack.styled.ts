import styled from "styled-components";
import { Link } from "react-router";

export const PacksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl}px;

  margin: ${({ theme }) => theme.spacing.xl}px;
`;

export const PackWrapper = styled.div`
  width: 160px;
  height: 192px;

  padding: ${({ theme }) => theme.spacing.m}px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.spacing.l}px;
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

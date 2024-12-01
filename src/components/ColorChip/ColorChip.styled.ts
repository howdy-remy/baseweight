import styled from "styled-components";

export const Chips = styled.div`
  display: flex;
  gap: 8px;
`;

export const Chip = styled.div<{ color: string }>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  width: 124px;
  padding: 16px;
  border-radius: 4px;
`;

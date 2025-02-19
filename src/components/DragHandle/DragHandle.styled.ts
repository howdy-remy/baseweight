import styled from "styled-components";

export const DragHandleWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
`;

export const DragHandleImg = styled.img`
  object-fit: contain;
  cursor: grab;
`;

import styled from "styled-components";

export const PieChartWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

export const PieChartSvg = styled.svg.attrs<{ width: number; height: number }>(
  (props) => ({
    style: {
      width: props.width,
      height: props.height,
    },
  }),
)`
  position: sticky;
  top: 56px;
`;

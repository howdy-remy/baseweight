import styled from "styled-components";

export const PieChartWrapper = styled.div`
  position: sticky;
  top: 56px;

  display: flex;
  justify-content: center;

  width: 100%;
  height: fit-content;
`;

export const PieChartCenter = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export const PieChartSvg = styled.svg.attrs<{ width: number; height: number }>(
  (props) => ({
    style: {
      width: props.width,
      height: props.height,
    },
  }),
)``;

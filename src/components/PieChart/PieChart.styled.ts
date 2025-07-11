import styled from "styled-components";

export const PieChartWrapper = styled.div`
  position: sticky;
  top: 56px;

  display: flex;
  justify-content: center;

  width: 100%;
  height: fit-content;

  @media (max-width: 1060px) {
    position: relative;
    top: 0;

    width: calc(100% - 32px);
  }
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

export const Text = styled.text`
  margin: 0;

  fill: ${({ theme }) => theme.colors.white};
  font-family: "Rubik", sans-serif;
  font-size: ${({ theme }) => theme.fontsizes.xs};
  line-height: 1.4;
`;

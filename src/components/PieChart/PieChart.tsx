import { ReactNode } from "react";
import Pie from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import {
  PieChartCenter,
  PieChartSvg,
  PieChartWrapper,
} from "./PieChart.styled";

interface Datum {
  label: string;
  value: number;
}

type PieChartProps = {
  data: Datum[];
  width: number;
  height: number;
  colors: string[];
  children?: ReactNode;
};
const accessor = (d: Datum) => d.value;

export const PieChart = ({
  data,
  width,
  height,
  colors,
  children,
}: PieChartProps) => {
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;
  const donutThickness = 64;

  const getColor = scaleOrdinal({
    domain: data,
    range: colors,
  });

  return (
    <PieChartWrapper>
      <PieChartSvg width={width} height={height}>
        <Group top={centerY} left={centerX}>
          <Pie
            data={data}
            pieValue={accessor}
            outerRadius={radius}
            innerRadius={radius - donutThickness}
            cornerRadius={3}
            padAngle={0.05}
          >
            {(pie) => (
              <Group className="visx-pie-arcs-group">
                {pie.arcs.map((arc, i) => (
                  <g key={`pie-arc-${i}`}>
                    <path d={pie.path(arc) || ""} fill={getColor(arc.data)} />
                  </g>
                ))}
              </Group>
            )}
          </Pie>
        </Group>
      </PieChartSvg>
      <PieChartCenter>{children}</PieChartCenter>
    </PieChartWrapper>
  );
};

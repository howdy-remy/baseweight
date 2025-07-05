import React, { ReactNode } from "react";
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import {
  PieChartCenter,
  PieChartSvg,
  PieChartWrapper,
} from "./PieChart.styled";
import { Label } from "./Label";

export interface Datum {
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
                  <React.Fragment key={`pie-arc-${i}`}>
                    <g>
                      <path d={pie.path(arc) || ""} fill={getColor(arc.data)} />
                    </g>
                    <Label
                      path={pie.path}
                      arc={arc as PieArcDatum<Datum>}
                      label={arc.data.label}
                    />
                  </React.Fragment>
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

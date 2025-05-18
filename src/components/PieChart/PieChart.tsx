import Pie from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";

interface Datum {
  label: string;
  value: number;
}

type PieChartProps = {
  data: Datum[];
  width: number;
  height: number;
  colors: string[];
};
const accessor = (d: Datum) => d.value;

export const PieChart = ({ data, width, height, colors }: PieChartProps) => {
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;
  const donutThickness = 64;

  const getColor = scaleOrdinal({
    domain: data,
    range: colors,
  });

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "sticky",
        top: "56px",
      }}
    >
      <Group top={centerY} left={centerX}>
        <Pie
          data={data}
          pieValue={accessor}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.05}
        >
          {(pie) => {
            console.log(pie);
            return (
              <Group className="visx-pie-arcs-group">
                {pie.arcs.map((arc, i) => (
                  <g key={`pie-arc-${i}`}>
                    <path d={pie.path(arc) || ""} fill={getColor(arc.data)} />
                  </g>
                ))}
              </Group>
            );
          }}
        </Pie>
      </Group>
    </svg>
  );
};

import { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { Datum } from "./PieChart";
import { Text } from "./PieChart.styled";

type LabelProps = {
  path: ProvidedProps<Datum>["path"];
  arc: PieArcDatum<Datum>;
  label: string;
};
export const Label = ({ path, arc, label }: LabelProps) => {
  const [centroidX, centroidY] = path.centroid(arc);
  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

  if (hasSpaceForLabel) {
    return (
      <Text
        x={centroidX}
        y={centroidY}
        dy=".33em"
        textAnchor="middle"
        pointerEvents="none"
      >
        {label}
      </Text>
    );
  }

  return null;
};

import { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { Datum } from "./PieChart";

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
      <text
        fill="white"
        x={centroidX}
        y={centroidY}
        dy=".33em"
        fontSize={9}
        textAnchor="middle"
        pointerEvents="none"
      >
        {label}
      </text>
    );
  }

  return null;
};

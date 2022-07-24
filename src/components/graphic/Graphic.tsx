import * as allCurves from "@visx/curve";
import { Group } from "@visx/group";
import { MarkerArrow, MarkerCircle, MarkerX } from "@visx/marker";
import { DateValue } from "@visx/mock-data/lib/generators/genDateValue";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { extent, max, min } from "d3-array";
import { useMemo } from "react";
import { useGrapicMethods } from "../../hooks/useGraphicMethods";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Forecast } from "../../interfaces";
import { dateFormat } from "../../utils/dateFormat";

interface Props {
  forecasts: Forecast[];
  width: number;
  height: number;
  labelX: string;
  labelY: string;
}

export default function Graphic({
  forecasts,
  width,
  height,
  labelX,
  labelY,
}: Props) {
  const { xScale, yScale, yMax, getX, getY } = useGrapicMethods(
    forecasts,
    width,
    height
  );

  const isMobile = useMediaQuery("min-width: 400px");
  const isTablet = useMediaQuery("min-width: 1075px");

  return (
    <div className="inline-block | mx-auto | my-18">
      <svg width={isTablet ? 1000 : isMobile ? 400 : width} height={height}>
        <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} />
        <Group left={80}>
          <AxisLeft
            scale={yScale}
            hideAxisLine
            hideTicks
            top={5}
            left={0}
            tickFormat={(v) => Math.floor(v - 273.15).toString() + "°"}
            label={labelY}
            stroke={"#1b1a1e"}
            tickTextFill={"#1b1a1e"}
            tickLabelProps={() => ({
              fontSize: ".75rem",
              fontWeight: 700,
            })}
          />
          <AxisBottom
            scale={xScale}
            hideAxisLine
            hideTicks
            top={yMax}
            label={labelX}
            tickFormat={(v) =>
              new Date(v).toLocaleDateString("es-CL", {
                weekday: "short",
                hour: "numeric",
              })
            }
            stroke={"#1b1a1e"}
            tickTextFill={"#1b1a1e"}
            tickLabelProps={() => ({
              fontSize: ".75rem",
              fontWeight: 700,
            })}
          />
          {forecasts.map((data, i) => (
            <circle
              key={i}
              r={4}
              cx={xScale(getX(data))}
              cy={yScale(getY(data))}
              stroke="#0000007c"
              fill="#f1024a7c"
            />
          ))}
          <LinePath<Forecast>
            curve={allCurves.curveLinear}
            data={forecasts}
            x={(d) => xScale(getX(d)) ?? 0}
            y={(d) => yScale(getY(d)) ?? 0}
            stroke="#0051ff7c"
            strokeWidth={0.6}
            strokeOpacity={2}
            shapeRendering="geometricPrecision"
            markerMid="url(#marker-circle)"
          />
        </Group>
      </svg>
    </div>
  );
}

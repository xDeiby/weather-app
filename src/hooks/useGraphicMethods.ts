import { scaleTime, scaleLinear } from "@visx/scale";
import { extent, min, max } from "d3-array";
import { useCallback, useMemo } from "react";
import { Forecast } from "../interfaces";

const margin = { top: 20, bottom: 20, left: 20, right: 20 };

export const useGrapicMethods = (
  forecasts: Forecast[],
  width: number,
  height: number
) => {
  const getX = useCallback((x: Forecast) => new Date(x.dt_txt), []);
  const getY = useCallback(
    (y: Forecast) => (y.main.temp_max + y.main.temp_min) / 2,
    []
  );

  const xMax = useMemo(() => width - margin.left - margin.right, [width]);
  const yMax = useMemo(() => height - margin.top - margin.bottom, [height]);

  const xScale = useMemo(
    () =>
      scaleTime({
        range: [0, xMax],
        domain: extent(forecasts, getX) as [Date, Date],
      }),
    [forecasts]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        domain: [
          min(forecasts, getY) as number,
          max(forecasts, getY) as number,
        ],
      }),
    [forecasts]
  );

  return { xScale, yScale, getX, getY, xMax, yMax };
};

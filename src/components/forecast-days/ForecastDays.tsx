import { useCallback, useMemo } from "react";
import { useWeatherContext } from "../../contexts/weather";
import { Forecast } from "../../interfaces/IForecast.interfaces";
import DayCard from "./DayCard/DayCard";

interface Props {
  forecastList: Forecast[];
}

type DayForecasts = Record<string, Forecast[]>;

export default function ForecastDays() {
  const forecastList = useWeatherContext().forecasts?.list ?? [];

  const days = useMemo(
    () =>
      forecastList.reduce<DayForecasts>((daysObj, day) => {
        const dayDate = new Date(day.dt_txt).toLocaleDateString("es-CL", {
          weekday: "long",
        });
        if (daysObj[dayDate]) {
          daysObj[dayDate] = daysObj[dayDate].concat(day);
        } else daysObj[dayDate] = [];

        return daysObj;
      }, {}),
    [forecastList]
  );

  console.log(days);

  return (
    <div className="w-full">
      <h1 className="text-2xl | font-bold | text-center | my-10 | text-blue-400">
        Clima en los próximos 5 días
      </h1>
      <div className="grid | grid-cols-1 | sm:grid-cols-2 | md:grid-cols-5 | sm | gap-2">
        {Object.entries(days).map(
          ([day, info]) =>
            info.length && <DayCard key={day} day={day} dayInfo={info} />
        )}
      </div>
    </div>
  );
}

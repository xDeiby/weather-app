import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import ForecastService from "../../../api/services/ForecastServices";
import {
  changeDaySelected,
  useWeatherContext,
} from "../../../contexts/weather";
import { Forecast } from "../../../interfaces/IForecast.interfaces";
import { dateFormat } from "../../../utils/dateFormat";

interface Props {
  dayInfo: Forecast[];
  day: string;
}

export default function DayCard({ day, dayInfo }: Props) {
  const { t_min, t_max } = useMemo(
    () => ({
      t_min:
        dayInfo.reduce((sum, d) => sum + d.main.temp_min, 0) / dayInfo.length,
      t_max:
        dayInfo.reduce((sum, d) => sum + d.main.temp_max, 0) / dayInfo.length,
    }),
    [dayInfo]
  );

  const { dispatch } = useWeatherContext();

  return (
    <NavLink
      // remove the accents, to avoid problems with isActive
      to={day.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
      className={({ isActive }) =>
        ` rounded-xl 
        | hover:bg-blue-200 
        | shadow-xl | flex 
        | flex-col 
        | items-center 
        | gap-1 
        | transition-colors 
        | py-2
        | px-4
        | ${isActive && "bg-blue-300 | text-white"}
        `
      }
      onClick={() => dispatch(changeDaySelected(dayInfo))}
    >
      {/* Day */}
      <h3 className="capitalize | font-bold | text-lg">{day}</h3>

      {/* Date */}
      <time className="text-xs | font-medium">
        {dateFormat(new Date(dayInfo[0].dt_txt))}
      </time>

      {/* icon */}
      <figure className="w-full | grid | place-items-center">
        <img
          className="block | w-16"
          src={ForecastService.image(dayInfo[0].weather[0].icon)}
          alt={dayInfo[0].weather[0].main}
        />

        {/* icon description */}
        <figcaption className="capitalize | font-bold">
          {dayInfo[0].weather[0].description}
        </figcaption>
      </figure>

      {/* t max / t min */}
      <div>
        <span className="text-red-600 | font-bold">
          {Math.floor(t_max - 273.15).toString() + "°"}
        </span>{" "}
        /{" "}
        <span className="text-blue-600 | font-bold">
          {Math.floor(t_min - 273.15).toString() + "°"}
        </span>
      </div>
    </NavLink>
  );
}

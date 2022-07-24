import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForecastService from "../api/services/ForecastServices";
import Graphic from "../components/graphic/Graphic";
import { useWeatherContext } from "../contexts/weather";
import { dateTime } from "../utils/dateFormat";

export default function ForecastDay() {
  const { daySelected } = useWeatherContext();

  const navigator = useNavigate();

  useEffect(() => {
    if (!daySelected.length) navigator("/");
  }, [daySelected]);

  return (
    <div className="w-full">
      {daySelected.length && (
        <Graphic
          forecasts={daySelected}
          width={1200}
          height={300}
          labelX="Hrs del día"
          labelY="Variación de T°"
        />
      )}

      <div className="grid | gap-4">
        {daySelected.map((dayHour) => (
          <div
            key={dayHour.dt_txt.toString()}
            style={{ boxShadow: "0 0 5px #0066ff4b" }}
            className="grid | grid-cols-2 | gap-4 | md:gap-2 | md:grid-cols-5 | justify-items-center | items-center | p-3 | rounded-2xl | justify-between | hover:bg-blue-200 | transition-colors"
          >
            {/* hour */}

            {/* icon */}
            <div className="flex | gap-2 | items-center">
              <time className="font-semibold">
                {dateTime(new Date(dayHour.dt_txt))}
              </time>
              <img
                src={ForecastService.image(dayHour.weather[0].icon)}
                alt={dayHour.weather[0].main}
              />
            </div>

            <div className="text-center">
              <p className="font-semibold">Nubosidad</p>
              <p className="text-xs">{dayHour.clouds.all} %</p>
            </div>

            <div className="text-center">
              <p className="font-semibold">Viento</p>
              <p className="text-xs">{dayHour.wind.speed} m/s</p>
            </div>

            <div className="text-center">
              <p className="font-semibold">Humedad</p>
              <p className="text-xs">{dayHour.main.humidity} %</p>
            </div>

            {/* weather */}
            <div className="flex | items-center gap-1">
              <h3 className="text-3xl | text-blue-500">
                {Math.floor(
                  (dayHour.main.temp_max + dayHour.main.temp_min) / 2 - 273.15
                ) + "°"}
              </h3>
              <div>
                <p className="capitalize | font-semibold">
                  {dayHour.weather[0].description}
                </p>
                <p className="text-xs">
                  Sensación T. {Math.floor(dayHour.main.feels_like - 273.15)}°
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

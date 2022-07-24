import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ForecastService from "../api/services/ForecastServices";
import ForecastDays from "../components/forecast-days/ForecastDays";
import Graphic from "../components/graphic/Graphic";
import { changeForecasts, useWeatherContext } from "../contexts/weather";
import { Forecast } from "../interfaces/IForecast.interfaces";

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  const { dispatch, forecasts } = useWeatherContext();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await ForecastService.city();
        dispatch(changeForecasts(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  return (
    <div
      style={{ width: "min(1280px, 90%)" }}
      className="min-h-screen | mx-auto | grid | place-items-center | py-10"
    >
      <h1 className="font-bold | text-4xl">
        {"<"} Weather App {"/>"}
      </h1>
      {forecasts && (
        <>
          <Graphic
            forecasts={forecasts.list}
            height={600}
            width={1200}
            labelX="Días"
            labelY="T° Promedio por día"
          />
          <ForecastDays />
        </>
      )}

      <Outlet />
    </div>
  );
}

import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error(
      "useWeatherContext should be inside WeatherContextProvider"
    );
  }

  return context;
};

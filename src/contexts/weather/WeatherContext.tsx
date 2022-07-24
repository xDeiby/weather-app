import { createContext, ReactNode, useReducer } from "react";
import { INITIAL_STATE, weatherReducer } from "./WeatherContextReducer";
import { WeatherDispatch, WeatherState } from "./WeatherContextTypes";

type WeatherContextParams = WeatherState & { dispatch: WeatherDispatch };

export const WeatherContext = createContext<WeatherContextParams | null>(null);

interface Props {
  children: ReactNode;
}

function WeatherContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(weatherReducer, INITIAL_STATE);

  return (
    <WeatherContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContextProvider;

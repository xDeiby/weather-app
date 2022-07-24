import { Forecast, ISeasonTmdb } from "../../interfaces";
import {
  ChangeDaySelected,
  ChangeForecasts,
  WeatherActionTypes,
} from "./WeatherContextTypes";

export const changeForecasts = (forecasts: ISeasonTmdb): ChangeForecasts => ({
  type: WeatherActionTypes.CHANGE_FORECASTS,
  forecasts,
});

export const changeDaySelected = (
  daySelected: Forecast[]
): ChangeDaySelected => ({
  type: WeatherActionTypes.CHANGE_SELECTED_DAY,
  daySelected,
});

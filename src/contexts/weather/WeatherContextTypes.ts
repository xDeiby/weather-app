import { Dispatch } from "react";
import { Forecast, ISeasonTmdb } from "../../interfaces";

export enum WeatherActionTypes {
  CHANGE_FORECASTS = "@action/CHANGE_FORECASTS",
  CHANGE_SELECTED_DAY = "@action/CHANGE_SELECTED_DAY",
}

export interface WeatherState {
  forecasts?: ISeasonTmdb;
  daySelected: Forecast[];
}

export interface ChangeForecasts {
  type: WeatherActionTypes.CHANGE_FORECASTS;
  forecasts: ISeasonTmdb;
}

export interface ChangeDaySelected {
  type: WeatherActionTypes.CHANGE_SELECTED_DAY;
  daySelected: Forecast[];
}

export type WeatherAction = ChangeDaySelected | ChangeForecasts;

export type WeatherDispatch = Dispatch<WeatherAction>;

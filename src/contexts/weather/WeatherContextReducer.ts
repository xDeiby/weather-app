import {
  WeatherAction,
  WeatherActionTypes,
  WeatherState,
} from "./WeatherContextTypes";

export const INITIAL_STATE: WeatherState = {
  forecasts: undefined,
  daySelected: [],
};

export const weatherReducer = (
  state = INITIAL_STATE,
  action: WeatherAction
): WeatherState => {
  const { CHANGE_FORECASTS, CHANGE_SELECTED_DAY } = WeatherActionTypes;

  switch (action.type) {
    case CHANGE_FORECASTS:
      return { ...state, forecasts: action.forecasts };

    case CHANGE_SELECTED_DAY:
      return { ...state, daySelected: action.daySelected };

    default:
      return state;
  }
};

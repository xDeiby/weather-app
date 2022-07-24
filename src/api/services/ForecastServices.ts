import { ISeasonTmdb } from "../../interfaces/IForecast.interfaces";
import openWeatherApi from "../axios";

class ForecastService {
  static image(name: string) {
    return `http://openweathermap.org/img/w/${name}.png`;
  }

  static async city(city = "santiago", coutryCode = "cl", lang = "es") {
    const params = {
      lang,
      q: `${city},${coutryCode}`,
      // TODO: mover al .env
      appid: "397dbbcd2cee0fabe1e50b88687abf34",
    };

    const response = await openWeatherApi.get<ISeasonTmdb>("forecast", {
      params,
    });

    return response.data;
  }
}

export default ForecastService;

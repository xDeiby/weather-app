import { BrowserRouter } from "react-router-dom";
import WeatherContextProvider from "./contexts/weather";
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <WeatherContextProvider>
        <Routes />
      </WeatherContextProvider>
    </BrowserRouter>
  );
}

export default App;

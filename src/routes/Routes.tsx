import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import ForecastDay from "../pages/ForecastDay.page";
import HomePage from "../pages/Home.page";

export default function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<HomePage />}>
        <Route path=":id" element={<ForecastDay />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRoutes>
  );
}

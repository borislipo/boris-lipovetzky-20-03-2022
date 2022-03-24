import { Routes, Route } from 'react-router-dom'
import { NavBar } from '../components/ui/navBar';
import { FavoriteCitiesScreen } from "../components/favoriteCities/favoriteCitiesScreen";
import { WeatherForecastScreen } from "../components/weatherForecast/weatherForecastScreen";

export const DashboardRouter = () => {
    return (
        <div>
            <NavBar />
            <div>
                <Routes>
                    <Route path="forecast" element={<WeatherForecastScreen />} />
                    <Route path="favorites" element={<FavoriteCitiesScreen />} />
                    <Route path="/" element={<WeatherForecastScreen />} />
                    <Route path="*" element={<WeatherForecastScreen />} />
                </Routes>
            </div>

        </div>
    )
}
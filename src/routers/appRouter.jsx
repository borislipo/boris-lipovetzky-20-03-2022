import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { DashboardRouter } from './dashboardRouter';

export const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<DashboardRouter />} />
            </Routes>
        </BrowserRouter>
    )
}
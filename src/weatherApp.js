import { Provider } from 'react-redux';
import { AppRouter } from './routers/appRouter';
import { store } from './store/store';
import './App.css';

export const WeatherApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}



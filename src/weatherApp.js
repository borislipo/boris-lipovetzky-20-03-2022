import { Provider } from 'react-redux';
import { AppRouter } from './routers/appRouter';
import { store } from './store/store';

export const WeatherApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}



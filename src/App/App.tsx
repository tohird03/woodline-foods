import React, {FC} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {observer, Provider} from 'mobx-react';
import {StyledChart} from '../components/chart';
import {Loading} from '../components/Loading';
import ScrollToTop from '../components/scroll-to-top';
import {Router} from '../router';
import {store} from '../store/store';
import {useStores} from '../store/store-context';
import ThemeProvider from '../theme';
import {useBootstrap} from './useBootstrap';

const App: FC = observer(() => {
  const {authStore} = useStores();
  const [isInitiated] = useBootstrap();

  if (isInitiated) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <ToastContainer style={{width: '400px'}} position="top-right" newestOnTop />
            <ScrollToTop />
            <StyledChart />
            <Router isAuth={authStore.isAuth} />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
});

export default App;

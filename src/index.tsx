import 'react-toastify/ReactToastify.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'mobx-react';
import App from './App/App';
import {StyledChart} from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import {store} from './store/store';
import ThemeProvider from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ToastContainer style={{width: '400px'}} position="top-right" newestOnTop />
          <ScrollToTop />
          <StyledChart />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);

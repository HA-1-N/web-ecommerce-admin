import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '@/components/global-styles/GlobalStyles';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { bindActionCreators } from 'redux';
import { decrement, increment } from '@/features/counter/counterSlice';
import { setupAxiosInterceptors } from './configs/axios-interceptor';
import HTTP_ADMIN_SERVICE from './configs/axios.config';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const actions = bindActionCreators(
  {
    increaseFetch: increment,
    decreaseFetch: decrement,
  },
  store.dispatch,
);

setupAxiosInterceptors(
  () => () => {},
  () => actions.increaseFetch(),
  () => actions.decreaseFetch(),
  HTTP_ADMIN_SERVICE,
);

root.render(
  <React.StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalStyles>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

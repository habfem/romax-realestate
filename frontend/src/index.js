import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.js";
import "./index.css";
import TagManager from 'react-gtm-module';

TagManager.initialize({
  gtmId: 'GTM-WND4N8KD',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </ThemeProvider>
  
);
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';
import Routes from './routes';

import CreateGlobalStyle from './styles/global';

const App: React.FC  = () => {
  return (
    <BrowserRouter>
      <CreateGlobalStyle />
      
      <AppProvider>
          <Routes />
      </AppProvider>
     </BrowserRouter>
  );
}

export default App;

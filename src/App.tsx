import React from 'react';
import AppProvider from './hooks';
import SignIp from './pages/SignIn';
// import SignUp from './pages/SignUp';

import CreateGlobalStyle from './styles/global';

const App: React.FC  = () => {
  return (
    <>
      <CreateGlobalStyle />
      
      <AppProvider>
        <SignIp />
      </AppProvider>
     </>
  );
}

export default App;

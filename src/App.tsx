import React from 'react';
import { AuthProvider } from './context/authContext';
import SignIp from './pages/SignIn';
// import SignUp from './pages/SignUp';
import CreateGlobalStyle from './styles/global';

const App: React.FC  = () => {
  return (
    <>
      <CreateGlobalStyle />
      <AuthProvider>
        <SignIp />
      </AuthProvider>
    </>
  );
}

export default App;

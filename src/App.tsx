import React from 'react';
import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/authContext';
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

      <ToastContainer />
    </>
  );
}

export default App;

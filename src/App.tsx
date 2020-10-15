import React from 'react';
import AuthContext from './context/authContext';
import SignIp from './pages/SignIn';
// import SignUp from './pages/SignUp';
import CreateGlobalStyle from './styles/global';

const App: React.FC  = () => {
  return (
    <>
      <CreateGlobalStyle />
      <AuthContext.Provider value={ { name: 'Murillo' } }>
        <SignIp />
      </AuthContext.Provider>
    </>
  );
}

export default App;

import React, { createContext, useCallback } from "react";
import axios from 'axios';

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;

  sigIn(credentials: Credentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  
  const sigIn = useCallback(async ({ email, password}) => {
    const response = await axios.post('http://localhost:3333/sessions', {
      email,
      password
    })

    console.log(response.data);
  }, [])

  return (
    <AuthContext.Provider value={{ name: 'Murillo', sigIn}}>
      { children }
    </AuthContext.Provider>
  )
}

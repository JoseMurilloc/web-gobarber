import React, { createContext, useCallback, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';


interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToaskContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {

  const addToast = useCallback(() => {
    console.log('Add Toast')
  }, []);
  const removeToast = useCallback(() => {
    console.log('Remove Toast')
  }, []);

  return (
    <ToaskContext.Provider value={{ addToast, removeToast}}>
      { children }
      <ToastContainer />
    </ToaskContext.Provider>
  );
}

function useToast(): ToastContextData {
  const context = useContext(ToaskContext)

  if (!context)  throw new Error('useToast must be used within a ToastProvider')

  return context;
}

export { ToastProvider, useToast };
import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';


interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage{
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToaskContext = createContext<ToastContextData>({} as ToastContextData);

/**
 * Component
 */
const ToastProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<ToastMessage[]>([])

  const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    };

    setMessage((state) => [...state, toast]);

  }, []);
  const removeToast = useCallback((id: string) => {
    setMessage(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToaskContext.Provider value={{ addToast, removeToast}}>
      { children }
      <ToastContainer messages={message}/>
    </ToaskContext.Provider>
  );
}

function useToast(): ToastContextData {
  const context = useContext(ToaskContext)

  if (!context)  throw new Error('useToast must be used within a ToastProvider')

  return context;
}

export { ToastProvider, useToast };
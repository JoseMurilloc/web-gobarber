import { useField } from '@unform/core';
import React, { 
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons/lib';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({ name, containerStyle = {}, icon: Icon, ...rest}) => {
  
  const [ isFocus, setIsFocus ] =useState(false);
  const [ isFilled, setIsFilled ] =useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, error, registerField, defaultValue } = useField(name);

  /**
   * Quando o input está recebendo focos 
   */
  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, [])

  /**
   * Bluer básicamente é quando input perde o focus
   */
  const handleInputBluer = useCallback(() => {
    
    if (inputRef.current?.value) 
      setIsFilled(true)
    else 
      setIsFilled(false)

    setIsFocus(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container style={containerStyle} isErrored={!!error} isFilled={isFilled} isFocus={isFocus}>
      { Icon && <Icon size={20}/>}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBluer}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest} 
      />
      {error && (
      <Error title={error}>
        <FiAlertCircle color="#c53030" size={20} />  
      </Error>
      )}
    </Container>
  );
};

export default Input;

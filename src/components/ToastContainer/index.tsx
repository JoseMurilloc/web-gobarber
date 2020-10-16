import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast} from './styles';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription={true}  >
        <FiAlertCircle size={20} />


        <div>
          <strong>Aconteceu um error</strong>
          <p>Não foi possivel fazer login na aplicação</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast hasDescription={false}   type="sucess">
        <FiAlertCircle size={20} />


        <div>
          <strong>Aconteceu um error</strong>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast hasDescription={true}   type="error">
        <FiAlertCircle size={20} />


        <div>
          <strong>Aconteceu um error</strong>
          <p>Não foi possivel fazer login na aplicação</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
    </Container>
  );
};

export default ToastContainer;

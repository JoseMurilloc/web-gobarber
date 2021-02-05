import React, { useState } from 'react';

import { 
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment
} from './styles';

import logoImage from '../../assets/logo.svg';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { sigOut, user } = useAuth()

  return (
    <Container>
     <Header>
       <HeaderContent>
          <img src={logoImage} alt="Image logo"/>
          <Profile>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name}/>
            ) : (
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: 'gray'
              }}></div>
            )}
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={sigOut}>
            <FiPower />
          </button>
       </HeaderContent>
     </Header>
     <Content>
       <Schedule>
          <h1>Horário agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img src="https://avatars.githubusercontent.com/u/43470555?s=460&u=d5a88d8aa43e4fc0f53a417320d1cc6fb4fc13d5&v=4" alt="Profile"/>
              <strong>José Murillo</strong>

              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manha</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/43470555?s=460&u=d5a88d8aa43e4fc0f53a417320d1cc6fb4fc13d5&v=4" alt="Profile"/>
                <strong>José Murillo</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/43470555?s=460&u=d5a88d8aa43e4fc0f53a417320d1cc6fb4fc13d5&v=4" alt="Profile"/>
                <strong>José Murillo</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/43470555?s=460&u=d5a88d8aa43e4fc0f53a417320d1cc6fb4fc13d5&v=4" alt="Profile"/>
                <strong>José Murillo</strong>
              </div>
            </Appointment>
          </Section>
       </Schedule>
       <Calendar />
     </Content>
    </Container>
  );
};

export default Dashboard;

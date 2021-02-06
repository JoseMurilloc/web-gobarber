import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
import api from '../../services/api';


interface MonthAvailability {
  day: number;
  availability: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);

  const { sigOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date,
    modifiers: DayModifiers) => {
      if(modifiers.available) {
        setSelectedDate(day)
      }
    },[]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, [])

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      }
    }).then(response => {
      setMonthAvailability(response.data)
    }) 
  }, [currentMonth, user.id]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.availability === false )
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      })

      return dates;
  }, [currentMonth, monthAvailability]);

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
      <Calendar>
        <DayPicker
          weekdaysShort={['D', 'S', 'T','Q', 'Q', 'S', 'S']}
          fromMonth={new Date()}
          disabledDays={[{daysOfWeek: [0,6]}, ...disableDays]}
          modifiers={{available: {daysOfWeek: [1,2,3,4,5]}}}
          onDayClick={handleDateChange}
          selectedDays={selectedDate}
          onMonthChange={handleMonthChange}
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]}
        />
      </Calendar>
     </Content>
    </Container>
  );
};

export default Dashboard;

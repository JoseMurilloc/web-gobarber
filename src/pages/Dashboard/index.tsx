import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import api from '../../services/api';
import { format, isAfter, isToday, parseISO } from 'date-fns';

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
import { ptBR } from 'date-fns/esm/locale';
import { Link } from 'react-router-dom';

interface MonthAvailability {
  day: number;
  availability: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  provider: {
    name: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const { sigOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date,
    modifiers: DayModifiers) => {
      if(modifiers.available && !modifiers.disabled) {
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

  useEffect(() => {
    api.get<Appointment[]>(`/appointments/me`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      const appointmentsFormatted = response.data.map(appointment => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm')
        }
      })

      setAppointments(appointmentsFormatted)
    })
  }, [selectedDate])

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

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR
    })
  }, [selectedDate])

  const selectWeekDay = useMemo(() => {
    return format(selectedDate,' cccc', { locale: ptBR })
  }, [selectedDate])

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12
    })
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12
    })
  }, [appointments])

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()))
  }, [appointments])

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
              <strong><Link to="/profile">{user.name}</Link></strong>
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
          {isToday(selectedDate) && <span>Hoje</span>}
          <span>{selectedDateAsText}</span>
          <span>{selectWeekDay}</span>
        </p>

        {isToday(selectedDate) && nextAppointment && (
          <NextAppointment>
            <strong>Agendamento a seguir</strong>

            <div>
              <img src={nextAppointment.provider.avatar_url} alt={nextAppointment.provider.name}/>
              <strong>{nextAppointment.provider.name}</strong>

              <span>
                <FiClock />
                {nextAppointment.hourFormatted}
              </span>
            </div>
          </NextAppointment>
        )}

        <Section>
          <strong>Manha</strong>

          {morningAppointments.length === 0 && (
            <p>Nenhum agendamento neste período</p>
          )}
          
          {morningAppointments.map(appointment => (
            <Appointment key={appointment.id}>
              <span>
                <FiClock />
                {appointment.hourFormatted}
              </span>

              <div>
                <img 
                  src={appointment.provider.avatar_url} 
                  alt={appointment.provider.name}
                />
                <strong>{appointment.provider.name}</strong>
              </div>
          </Appointment>
          ))}
        </Section>

        <Section>
          <strong>Tarde</strong>
          

          {afternoonAppointments.length === 0 && (
            <p>Nenhum agendamento neste período</p>
          )}
          


          {afternoonAppointments.map(appointment => (
            <Appointment key={appointment.id}>
              <span>
                <FiClock />
                {appointment.hourFormatted}
              </span>

              <div>
                <img 
                  src={appointment.provider.avatar_url} 
                  alt={appointment.provider.name}
                />
                <strong>{appointment.provider.name}</strong>
              </div>
          </Appointment>
          ))}
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

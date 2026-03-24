import React from 'react';
import dayjs from 'dayjs';
import { type DailyAppointmentsCountByService } from '../../types';
import MonthlyHeader from '../monthly/monthly-header.component';
import MonthlyViewWorkload from '../monthly/monthly-workload-view.component';
import styles from '../appointments-calendar-view-view.scss';
import { useSelectedDate } from '../../hooks/useSelectedDate';

interface WeeklyCalendarViewProps {
  events: Array<DailyAppointmentsCountByService>;
}

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({ events }) => {
  const selectedDate = useSelectedDate();
  const weekStartDate = dayjs(selectedDate).startOf('week');
  const weekDays = Array.from({ length: 7 }, (_, index) => weekStartDate.add(index, 'day'));

  return (
    <div className={styles.calendarViewContainer} data-testid="weekly-calendar-view">
      <MonthlyHeader />
      <div className={styles.wrapper}>
        <div className={styles.weeklyCalendar}>
          {weekDays.map((dateTime, i) => (
            <MonthlyViewWorkload key={i} dateTime={dateTime} events={events} restrictToSelectedMonth={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarView;

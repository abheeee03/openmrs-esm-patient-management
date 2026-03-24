import React from 'react';
import dayjs from 'dayjs';
import { type DailyAppointmentsCountByService } from '../../types';
import MonthlyHeader from '../monthly/monthly-header.component';
import MonthlyViewWorkload from '../monthly/monthly-workload-view.component';
import styles from '../appointments-calendar-view-view.scss';
import { useSelectedDate } from '../../hooks/useSelectedDate';

interface DailyCalendarViewProps {
  events: Array<DailyAppointmentsCountByService>;
}

const DailyCalendarView: React.FC<DailyCalendarViewProps> = ({ events }) => {
  const selectedDate = useSelectedDate();
  const selectedDay = dayjs(selectedDate);

  return (
    <div className={styles.calendarViewContainer} data-testid="daily-calendar-view">
      <MonthlyHeader />
      <div className={styles.wrapper}>
        <div className={styles.dailyCalendar}>
          <MonthlyViewWorkload
            dateTime={selectedDay}
            events={events}
            showAllServices={true}
            restrictToSelectedMonth={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyCalendarView;

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ContentSwitcher, Switch } from '@carbon/react';
import { useAppointmentsCalendar } from '../hooks/useAppointmentsCalendar';
import AppointmentsHeader from '../header/appointments-header.component';
import CalendarHeader from './header/calendar-header.component';
import DailyCalendarView from './daily/daily-calendar-view.component';
import MonthlyCalendarView from './monthly/monthly-calendar-view.component';
import WeeklyCalendarView from './weekly/weekly-calendar-view.component';
import { useSelectedDate } from '../hooks/useSelectedDate';
import styles from './header/calendar-header.scss';

enum CalendarViewModes {
  DAILY = 0,
  WEEKLY = 1,
  MONTHLY = 2,
}

const AppointmentsCalendarView: React.FC = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<CalendarViewModes>(CalendarViewModes.MONTHLY);
  const selectedDate = useSelectedDate();
  const period =
    viewMode === CalendarViewModes.DAILY ? 'daily' : viewMode === CalendarViewModes.WEEKLY ? 'weekly' : 'monthly';
  const { calendarEvents } = useAppointmentsCalendar(dayjs(selectedDate).toISOString(), period);

  return (
    <div data-testid="appointments-calendar">
      <AppointmentsHeader title={t('calendar', 'Calendar')} />
      <CalendarHeader
        actions={
          <ContentSwitcher
            className={styles.viewSwitcher}
            selectedIndex={viewMode}
            size="sm"
            onChange={({ index }) => setViewMode(index as CalendarViewModes)}>
            <Switch name="day">{t('day', 'Day')}</Switch>
            <Switch name="week">{t('week', 'Week')}</Switch>
            <Switch name="month">{t('month', 'Month')}</Switch>
          </ContentSwitcher>
        }
      />
      {viewMode === CalendarViewModes.DAILY ? (
        <DailyCalendarView events={calendarEvents} />
      ) : viewMode === CalendarViewModes.WEEKLY ? (
        <WeeklyCalendarView events={calendarEvents} />
      ) : (
        <MonthlyCalendarView events={calendarEvents} />
      )}
    </div>
  );
};

export default AppointmentsCalendarView;

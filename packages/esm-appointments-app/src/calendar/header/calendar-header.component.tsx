import React, { type ReactNode } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Button } from '@carbon/react';
import { ArrowLeft } from '@carbon/react/icons';
import { navigate } from '@openmrs/esm-framework';
import { spaHomePage } from '../../constants';
import { useSelectedDate } from '../../hooks/useSelectedDate';
import styles from './calendar-header.scss';

interface CalendarHeaderProps {
  actions?: ReactNode;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ actions }) => {
  const { t } = useTranslation();
  const selectedDate = useSelectedDate();

  const handleClick = () => {
    navigate({ to: `${spaHomePage}/appointments/${dayjs(selectedDate).format('YYYY-MM-DD')}` });
  };

  return (
    <div className={styles.calendarHeaderContainer}>
      <div className={styles.titleContainer}>
        <Button
          className={styles.backButton}
          iconDescription={t('back', 'Back')}
          kind="ghost"
          onClick={handleClick}
          renderIcon={ArrowLeft}
          size="lg">
          <span>{t('back', 'Back')}</span>
        </Button>
        {actions ? <div className={styles.actionsContainer}>{actions}</div> : null}
      </div>
    </div>
  );
};
export default CalendarHeader;

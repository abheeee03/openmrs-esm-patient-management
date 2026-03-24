import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AppointmentsCalendarView from './appointments-calendar-view.component';
import { BrowserRouter } from 'react-router-dom';
import { useAppointmentsCalendar } from '../hooks/useAppointmentsCalendar';

jest.mock('../hooks/useAppointmentsCalendar', () => ({
  useAppointmentsCalendar: jest.fn(),
}));

const mockUseAppointmentsCalendar = jest.mocked(useAppointmentsCalendar);

describe('Appointment calendar view', () => {
  beforeEach(() => {
    mockUseAppointmentsCalendar.mockReturnValue({
      isLoading: false,
      calendarEvents: [],
      error: undefined,
    });
  });

  it('renders monthly view by default and switches between day, week and month', async () => {
    render(
      <BrowserRouter>
        <AppointmentsCalendarView />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('monthly-calendar-view')).toBeInTheDocument();
    expect(screen.queryByTestId('weekly-calendar-view')).not.toBeInTheDocument();
    expect(screen.queryByTestId('daily-calendar-view')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /day/i }));

    expect(screen.getByTestId('daily-calendar-view')).toBeInTheDocument();
    expect(screen.queryByTestId('weekly-calendar-view')).not.toBeInTheDocument();
    expect(screen.queryByTestId('monthly-calendar-view')).not.toBeInTheDocument();

    expect(mockUseAppointmentsCalendar).toHaveBeenCalledWith(expect.any(String), 'daily');

    fireEvent.click(screen.getByRole('button', { name: /week/i }));

    expect(screen.getByTestId('weekly-calendar-view')).toBeInTheDocument();
    expect(screen.queryByTestId('daily-calendar-view')).not.toBeInTheDocument();
    expect(screen.queryByTestId('monthly-calendar-view')).not.toBeInTheDocument();

    expect(mockUseAppointmentsCalendar).toHaveBeenCalledWith(expect.any(String), 'weekly');

    fireEvent.click(screen.getByRole('button', { name: /month/i }));

    expect(screen.getByTestId('monthly-calendar-view')).toBeInTheDocument();
    expect(screen.queryByTestId('daily-calendar-view')).not.toBeInTheDocument();
    expect(screen.queryByTestId('weekly-calendar-view')).not.toBeInTheDocument();

    expect(mockUseAppointmentsCalendar).toHaveBeenCalledWith(expect.any(String), 'monthly');
  });
});

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DatePicker = ({ minYear, substractionYears }) => {
  // Validate minYear and maxYear to ensure they are within a reasonable range
  substractionYears = new Date().getFullYear() - substractionYears; // Maximum year set to the current year if it's above that

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initialize with the current year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Initialize with the current month (0-indexed)

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const formatSelectedDate = () => {
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return 'No date selected';
  };

  const renderYearDropdown = () => {
    const years = [];

    // Generate a range of years within the specified minimum and maximum
    for (let year = minYear; year <= substractionYears; year++) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return (
      <select
        className="block w-1/4 p-2 bg-gray-200 border border-gray-300 rounded-md"
        onChange={handleYearChange}
        value={selectedYear}
      >
        {years}
      </select>
    );
  };

  const renderMonthDropdown = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
      <select
        className="block w-1/4 p-2 bg-gray-200 border border-gray-300 rounded-md"
        onChange={handleMonthChange}
        value={selectedMonth}
      >
        {months.map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </select>
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    const calendarDays = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="empty-day w-10 h-10"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <div
          key={day}
          onClick={() => handleDateClick(new Date(selectedYear, selectedMonth, day))}
          className="calendar-day w-10 h-10 cursor-pointer hover:bg-gray-200"
        >
          {day}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((dayName) => (
          <div key={dayName} className="day-name w-10 h-10">
            {dayName}
          </div>
        ))}
        {calendarDays}
      </div>
    );
  };

  useEffect(() => {
    setSelectedDate(new Date(selectedYear, selectedMonth, 1));
  }, [selectedYear, selectedMonth]);

  return (
    <div className="container mx-auto my-4 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="mr-2">Select Year:</div>
        {renderYearDropdown()}
        <div className="mx-2">Select Month:</div>
        {renderMonthDropdown()}
      </div>
      <div className="text-center text-xl font-semibold mb-2">
        Selected Date: {formatSelectedDate()}
      </div>
      <div className="p-2">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  minYear: PropTypes.number, // Minimum selectable year
  substractionYears: PropTypes.number, // Maximum selectable year
};

export default DatePicker;
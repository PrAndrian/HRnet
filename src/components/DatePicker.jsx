import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DatePicker = ({ id,minYear, substractionYears,zIndex,isError,setter }) => {
  // Validate minYear and maxYear to ensure they are within a reasonable range
  substractionYears = new Date().getFullYear() - substractionYears; // Maximum year set to the current year if it's above that

  const [selectedDate,setSelectedDate] = useState("Choose...")
  const [selectedYear, setSelectedYear] = useState(substractionYears); // Initialize with the current year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Initialize with the current month (0-indexed)
  const [visible,setVisible] = useState(false)

  const handleDateClick = (date) => {
    const formatedDate = formatSelectedDate(date)
    setSelectedDate(formatedDate)
    setter(formatedDate)
    setVisible(false);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const formatSelectedDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
          className="calendar-day flex justify-center items-center w-10 h-10 cursor-pointer hover:bg-gray-200"
        >
          {day}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((dayName) => (
          <div key={dayName} className="flex justify-center items-center day-name w-10 h-10">
            {dayName}
          </div>
        ))}
        {calendarDays}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (visible && !event.target.closest('.relative')) {
        // Clicked outside the dropdown, so close it
        setVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, [visible]);

  return (
    <div id={id} className={`w-[370px] relative z-${zIndex}`}>
      <span className={`
          font-semibold
          flex
          items-center
          justify-between
          h-[45px]
          w-full
          p-2
          bg-transparent
          border
          border-[#414A3D] 
          border-opacity-40 
          rounded-lg
          ${isError ? "border border-4 border-red" : ""}
        `}
        
        onClick={()=>setVisible(!visible)}
      > 
        {selectedDate}
        <FontAwesomeIcon icon={faCalendar}/>    
      </span>
      {visible &&      
        <div className="container mt-2 px-4 pt-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg absolute max-h-fit">
          <div className="flex items-center justify-between mb-4">
            <div>Year:</div>
            {renderYearDropdown()}
            <div>Month:</div>
            {renderMonthDropdown()}
            </div>
            <div className="p-2">
              {renderCalendarDays()}
            </div>
        </div>
      }
    </div>
  );
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  minYear: PropTypes.number, // Minimum selectable year
  substractionYears: PropTypes.number, // Maximum selectable year
  zIndex: PropTypes.string.isRequired, // z-inddex
  isError : PropTypes.bool.isRequired,
  setter : PropTypes.func.isRequired, 

};

export default DatePicker;
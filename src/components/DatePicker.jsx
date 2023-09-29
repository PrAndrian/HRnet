import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DatePicker = ({ id,selectedDate,minYear, substractionYears,zIndex,isError,setter,backgroundColor,backgroundColorDropdown, textColor, borderColor, width,height }) => {
  // Validate minYear and maxYear to ensure they are within a reasonable range
  substractionYears = new Date().getFullYear() - substractionYears; // Maximum year set to the current year if it's above that

  const [selectedYear, setSelectedYear] = useState(substractionYears); // Initialize with the current year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Initialize with the current month (0-indexed)
  const [visible,setVisible] = useState(false)

  const handleChange = (event) => {
    const inputDate = event.target.value;
    setter(inputDate);
  };

  const formatSelectedDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date) => {
    const formatedDate = formatSelectedDate(date)
    setter(formatedDate)
    setVisible(false);
  };

  const handleClick = ()=>{
    setVisible(!visible)
  }

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
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
        className="block w-1/2 p-2 bg-gray-200 border border-gray-300 rounded-md"
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
        className="block w-1/2 p-2 bg-gray-200 border border-gray-300 rounded-md"
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

  return (
    <div id={id} className={`w-${width} relative ${zIndex}`}>
      <div className='
        flex
        items-center
        justify-between
        relative
        '
      >
        <input className={`
            font-semibold
            flex
            items-center
            justify-between
            h-${height}
            w-full
            p-2
            bg-transparent
            border  
            rounded-lg
            ${isError ? "border-4 border-red" : `border-[#ccc]`}
          `}
          style={{ backgroundColor, color: textColor }}
          onFocus={handleClick}
          onBlur={()=>setTimeout(handleClick, 200)}
          onChange={handleChange}
          value={selectedDate}
          type="date"
        /> 
        <FontAwesomeIcon className='absolute right-3' icon={faCalendar}/>    
      </div>
      {visible &&      
        <div
          style={{ color: textColor }} 
          className={`container border border-${borderColor} mt-2 px-4 pt-2 bg-${backgroundColorDropdown} shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg absolute max-h-fit`}>
          <div className="flex items-center justify-between gap-2 mb-4">
            {renderYearDropdown()}
            {renderMonthDropdown()}
          </div>
          <div>
            {renderCalendarDays()}
          </div>
        </div>
      }
    </div>
  );
  
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  minYear: PropTypes.number,
  substractionYears: PropTypes.number,
  zIndex: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  setter: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string, // Nouvelle prop pour la couleur de fond
  backgroundColorDropdown: PropTypes.string,
  textColor: PropTypes.string, // Nouvelle prop pour la couleur du texte
  borderColor: PropTypes.string, // Nouvelle prop pour la couleur de la bordure
  width: PropTypes.string, // Nouvelle prop pour la couleur de la bordure
  height: PropTypes.string, // Nouvelle prop pour la couleur de la bordure
};

// Définition des valeurs par défaut pour les nouvelles props
DatePicker.defaultProps = {
  backgroundColor: 'transparent', // Par défaut, la couleur de fond est transparente
  textColor: '#000', // Par défaut, la couleur du texte est noire
  borderColor: '#ccc', // Par défaut, la couleur de la bordure est grise
  backgroundColorDropdown: 'white', // Par défaut, la couleur de la bordure est grise
};
export default DatePicker;
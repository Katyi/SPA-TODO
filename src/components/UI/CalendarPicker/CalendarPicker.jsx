import React, { useEffect, useState } from 'react';
import './CalendarPicker.css';
import MyButton from '../button/MyButton';
import navigateBefore from '../../../assets/navigate-before.svg';
import navigateNext from '../../../assets/navigate-next.svg';

const CalendarPicker = ({ onClose, selectedDate, setSelectedDate }) => {
  const [currentDay, setCurrentDay] = useState(
    selectedDate.length === 10 ? new Date(selectedDate.slice(6), selectedDate.slice(3, 5) - 1, selectedDate.slice(0, 2))
      : selectedDate.length === 6 ? new Date(new Date().getFullYear(), selectedDate.slice(3, 5) - 1, selectedDate.slice(0, 2))
        : selectedDate.length === 3 ? new Date(new Date().getFullYear(), new Date().getMonth(), selectedDate.slice(0, 2)) : new Date());
  const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
  const [days, setDays] = useState([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getMonthDays = () => {
    console.log(currentDay)
    setCurrentDay(
      selectedDate.length === 10 ? new Date(selectedDate.slice(6), selectedDate.slice(3, 5) - 1, selectedDate.slice(0, 2))
        : selectedDate.length === 6 ? new Date(currentYear, selectedDate.slice(3, 5) - 1, selectedDate.slice(0, 2))
          : selectedDate.length === 3 ? new Date(currentYear, currentMonth, selectedDate.slice(0, 2)) : currentDay);
    setCurrentMonth(currentDay.getMonth())
    setCurrentYear(currentDay.getFullYear())
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const grid = [];
    let row = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      row.push("");
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      row.push(i);
      // Start a new row if 7 days have been added
      if (row.length === 7) {
        grid.push(row);
        row = [];
      }
    }
    // Add empty cells for days after the last day of the month
    if (row.length > 0) {
      for (let i = row.length; i < 7; i++) {
        row.push("");
      }
    }

    if (row.length > 0) {
      grid.push(row);
    }

    setDays(grid);
  };

  const getNextMonth = (e) => {
    e.preventDefault();
    if (selectedDate) {
      let yyyy = selectedDate.slice(6);
      let dd = selectedDate.slice(0, 2);
      let mm = Number(selectedDate.slice(3, 5)) + 1;
      if (mm < 10) {
        mm = '0' + mm;
      } else if (mm > 12) {
        mm = '01';
        yyyy = (Number(yyyy) + 1).toString();
      }
      const formattedToday = dd + '.' + mm + '.' + yyyy;
      setSelectedDate(formattedToday);
    } else {
      setSelectedDate("");
      setCurrentDay(new Date(currentYear, currentMonth + 1, currentDay.getDate()));
      setCurrentMonth(currentMonth + 1);
    }
  }

  const getPrevMonth = (e) => {
    e.preventDefault();
    if (selectedDate) {
      let yyyy = selectedDate.slice(6);
      let dd = selectedDate.slice(0, 2);
      let mm = Number(selectedDate.slice(3, 5)) - 1;
      if (mm < 1) {
        mm = '12';
        yyyy = Number(yyyy) - 1;
      } else if (mm < 10) {
        mm = '0' + mm;
      }
      const formattedToday = dd + '.' + mm + '.' + yyyy;
      setSelectedDate(formattedToday);
    } else {
      setSelectedDate("");
      setCurrentDay(new Date(currentYear, currentMonth - 1, currentDay.getDate()));
      setCurrentMonth(currentMonth - 1);
    }
  }

  const handleDayClick = (date) => {
    // format date to DD.MM.YYYY
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '.' + mm + '.' + yyyy;
    setSelectedDate(formattedToday);
    onClose(date);
  };

  useEffect(() => {
    getMonthDays();
    // eslint-disable-next-line
  }, [selectedDate])

  return (
    <div className='calendarPicker'>
      <div className='calendarHeader'>
        <MyButton style={{ padding: "0px 20px" }} type='button' onClick={(e) => getPrevMonth(e)}><img className='icon' src={navigateBefore} alt="navigateBefore" /></MyButton>
        <span>
          {`${daysOfWeek[currentDay.getDay()]} 
          ${currentDay.getDate()} ${currentDay.toLocaleString('en-US', { month: 'long' })} 
          ${currentDay.getFullYear()}`}
        </span>
        <MyButton style={{ padding: "0px 20px" }} onClick={(e) => getNextMonth(e)}><img className='icon' src={navigateNext} alt="navigateBefore" /></MyButton>
      </div>
      <div className='calendarGrid'>
        {daysOfWeek.map((day) => (
          <div key={day} className='calendarDayLabel'>
            {day}
          </div>
        ))}
        {days.map(row => (
          row.map((i, index) => (
            <div
              key={index}
              className={`calendarDay ${selectedDate !== "" && i === Number(selectedDate.slice(0, 2)) ? 'active' : ''}`}
              onClick={() => handleDayClick(new Date(currentYear, currentMonth, i))}
            >
              {i}
            </div>
          ))
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <MyButton onClick={() => onClose()}>Close</MyButton>
      </div>
    </div>
  )
}

export default CalendarPicker;
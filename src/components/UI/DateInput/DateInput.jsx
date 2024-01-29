import React, { useState, useRef, useEffect } from 'react';
import './DateInput.css';
import CalendarPicker from '../CalendarPicker/CalendarPicker';
import calendar from '../../../assets/calendar.svg';
import InputMask from 'react-input-mask';

const DateInput = ({ selectedDate, setSelectedDate }) => {
  const pickerRef = useRef(null);
  const [openPicker, setOpenPicker] = useState(false);
  
  const handleIconClick = () => {
    setOpenPicker(!openPicker);
  };

  const handleDateChange = (event) => {
    let input = event.target.value;
    setSelectedDate(input);
  };

  const handleDateSelect = () => {
    // Handle selected date here
    setOpenPicker(false);    
  };

  const handleOutsideClick = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setOpenPicker(false);
    }
  };

  const handleOutEscape = (e) => {
    if (e.key === 'Escape') {
      setOpenPicker(false);
    }
  };

  useEffect(() => {    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleOutEscape);
    return () => document.removeEventListener('keydown', handleOutEscape);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='dateInputWrapper' ref={pickerRef}>
      <div className='dateInput' onClick={handleIconClick}>
      <InputMask
        className="inputMask" 
        mask='99.99.9999' 
        maskChar="" 
        placeholder='DD.MM.YYYY'	
        value={selectedDate || ""} 
        onChange={handleDateChange}
      />
      <img src={calendar} alt="calendar" className="calendarIcon"/>
      </div>
      {openPicker &&
        <CalendarPicker
          onClose={handleDateSelect}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      }
    </div>
  )
}

export default DateInput;
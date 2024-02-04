import { useEffect, useRef} from 'react';
import './CustomSelect.css';
import downArrow from '../../../assets/down-arrow.svg';

const CustomSelect = ({options, priority, onChange, open, setOpen}) => {
  const selectRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSelectKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleSelectKeyDown);
    return () => document.removeEventListener('keydown', handleSelectKeyDown);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="selectContainer" ref={selectRef}>
      <div className="selectButton" onClick={() => setOpen(!open)}>
        <div className='selectTitle'>{priority}</div>
        <img src={downArrow} alt="downArrow" className={`"downArrow" ${open ? "rotate" : ""}`} />
      </div>
      <div className={`dropdownStyle ${open ? "show" : "hidden"}`} onKeyDown={handleSelectKeyDown}>
        {options?.map((opt, index) => (
          <div className="dropdownItem" key={index} onClick={()=> onChange(opt.value)}>
            <div className="optionTitle">{opt.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomSelect;
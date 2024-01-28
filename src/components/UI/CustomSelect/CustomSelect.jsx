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

  const handleOutEscape = (e) => {
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
    document.addEventListener('keydown', handleOutEscape);
    return () => document.removeEventListener('keydown', handleOutEscape);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="selectContainer" ref={selectRef}>
      <div className="selectButton" onClick={() => setOpen(!open)}>
        <div className='selectTitle'>{priority}</div>
        <img src={downArrow} alt="downArrow" className={`"downArrow" ${open ? "rotate" : ""}`} />
      </div>
      <div className={`dropdownStyle ${open ? "show" : "hidden"}`}>
        {options?.map((opt, index) => (
          <div className="dropdownItem" key={index}
            // onChange={onChange}
            onClick={()=> onChange(opt.value)}
            // onClick={onChange}
          >
            <div className="optionTitle">{opt.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomSelect;
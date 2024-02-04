import React, { useEffect } from "react";
import cl from './MyModal.module.css';

const MyModal = ({ children, visible, setVisible, setErrors }) => {
  const rootClasses = [cl.myModal]

  if (visible) {
    rootClasses.push(cl.active);
  }

  const handleOutEscape = (e) => {
    if (e.key === 'Escape' && e.target.id === 'btn') {
      setVisible(false);
      setErrors({});
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOutEscape);
    return () => document.removeEventListener('keydown', handleOutEscape);
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className={rootClasses.join(' ')} onClick={() => {
        setVisible(false);
        setErrors({})
      }}
    >
      <div className={cl.myModalContent} 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default MyModal;
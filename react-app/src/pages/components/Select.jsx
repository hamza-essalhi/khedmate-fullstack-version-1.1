import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";


// custom select no need for select input , bullshit :)
const Select = ({ options, op, onChange,classValue }) => {
  const [selectedOption, setSelectedOption] = useState('');
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleOptionsList = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    if (selectedOption === ''){
      setSelectedOption(op)
    }
  },[op,selectedOption])

  const handleSelection = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div className={classValue?`custom-select ${classValue}`:'custom-select' }>
      <div className="select-input" tabIndex="0" onClick={toggleOptionsList}>
        <span className="selected-option">
          {selectedOption || 'Selecte'}
        </span>
        {isOpen ? (
          <AiFillCaretUp></AiFillCaretUp>
        ) : (
          <AiFillCaretDown></AiFillCaretDown>
        )}
      </div>
      {isOpen && (
        <ul className={isOpen ? "options" :"active"}>
          {options.map((option) => (
            <li
              key={option.value}
              className={option.value === selectedOption ? "selected" : ""}
              onClick={() => handleSelection(option.value)}
              value={option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

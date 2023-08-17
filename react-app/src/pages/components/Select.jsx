import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";


// custom select no need for select input , bullshit :)
const Select = ({ options, defaultValue, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptionsList = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div className="custom-select">
      <div className="select-input" tabIndex="0" onClick={toggleOptionsList}>
        <span className="selected-option">
          {selectedOption || "Select an option"}
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

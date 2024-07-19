import './select.css';

import React, {useEffect, useRef, useState} from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange?: (selected: Option[]) => void;
  multiselect?: boolean;
}

const SelectComp: React.FC<CustomSelectProps> = ({options, onChange, multiselect = false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    if (multiselect) {
      if (selectedOptions.find((selected) => selected.value === option.value)) {
        const newSelectedOptions = selectedOptions.filter((selected) => selected.value !== option.value);

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
      } else {
        const newSelectedOptions = [...selectedOptions, option];

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
      onChange?.([option]);
    }
  };

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="custom-select__selected" onClick={() => setIsOpen(!isOpen)}>
        {selectedOptions.length > 0
          ? selectedOptions.map((option) => option.label).join(', ')
          : 'Select an option'}
      </div>
      {isOpen && (
        <div className="custom-select__options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select__option ${
                selectedOptions.find((selected) => selected.value === option.value) ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectComp;

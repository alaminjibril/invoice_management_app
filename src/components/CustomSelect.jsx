import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({ options, value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Find the currently selected label to display
  const selectedOption = options.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <div 
        className={`form-input flex justify-between items-center cursor-pointer select-none transition-colors border
          ${error ? 'border-theme-danger' : 'border-theme-border dark:border-theme-border-dark'}
          ${isOpen ? 'border-theme-accent dark:border-theme-accent' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <span className="font-bold text-theme-text dark:text-white">
          {selectedOption ? selectedOption.label : 'Select...'}
        </span>
        <ChevronDown size={14} className="text-theme-accent" strokeWidth={3} />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#252945] rounded-lg shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.25)] z-50 flex flex-col overflow-hidden">
          {options.map((opt, idx) => {
            const isLast = idx === options.length - 1;
            return (
              <div
                key={opt.value}
                className={`
                  p-4 font-bold text-[15px] cursor-pointer select-none
                  text-theme-text dark:text-[#DFE3FA] hover:text-theme-accent dark:hover:text-theme-accent transition-colors
                  ${!isLast ? 'border-b border-[#DFE3FA] dark:border-[#1E2139]' : ''}
                `}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

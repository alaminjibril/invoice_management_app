import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function DatePicker({ selectedDate, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // viewDate dictates the currently visible month/year on the calendar pane
  const initialView = selectedDate ? new Date(selectedDate) : new Date();
  const [viewDate, setViewDate] = useState(initialView);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset view date back to selection when closing without picking
        if (selectedDate) setViewDate(new Date(selectedDate));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, selectedDate]);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelectDate = (dateObj) => {
    // Format to YYYY-MM-DD ensuring local timezone pad
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
    setIsOpen(false);
  };

  // Matrix building logic
  const getDaysMatrix = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Previous month info to fill earliest slots
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const matrix = [];
    
    // Fill previous month padding
    for (let i = 0; i < firstDayOfMonth; i++) {
        matrix.push({
            date: new Date(year, month - 1, daysInPrevMonth - firstDayOfMonth + i + 1),
            isCurrentMonth: false
        });
    }

    // Fill current month
    for (let i = 1; i <= daysInMonth; i++) {
        matrix.push({
            date: new Date(year, month, i),
            isCurrentMonth: true
        });
    }

    // Fill next month padding to complete rigid standard grids (usually 35 or 42 cells)
    const totalCells = matrix.length > 35 ? 42 : 35;
    let nextMonthDay = 1;
    while(matrix.length < totalCells) {
        matrix.push({
            date: new Date(year, month + 1, nextMonthDay++),
            isCurrentMonth: false
        });
    }

    return matrix;
  };

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return 'Selected Date';
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getMonthYearLabel = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
  };

  const isSelected = (dateObj) => {
    if (!selectedDate) return false;
    const s = new Date(selectedDate);
    return s.getFullYear() === dateObj.getFullYear() && 
           s.getMonth() === dateObj.getMonth() && 
           s.getDate() === dateObj.getDate();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger */}
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
          {formatDateLabel(selectedDate)}
        </span>
        <CalendarIcon size={16} className="text-[#7E88C3]" strokeWidth={2.5} />
      </div>

      {/* Calendar Flyout */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[240px] bg-white dark:bg-[#252945] rounded-lg shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.25)] z-50 p-6 flex flex-col select-none">
          
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-6">
            <button type="button" onClick={handlePrevMonth} className="text-theme-accent hover:text-[#9277FF]">
              <ChevronLeft size={16} strokeWidth={3} />
            </button>
            <span className="font-bold text-[15px] text-theme-text dark:text-white">
              {getMonthYearLabel()}
            </span>
            <button type="button" onClick={handleNextMonth} className="text-theme-accent hover:text-[#9277FF]">
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>

          {/* Grid Area */}
          <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-[15px] font-bold">
             {getDaysMatrix().map((cell, idx) => {
               const active = isSelected(cell.date);
               return (
                 <div
                   key={idx}
                   onClick={() => handleSelectDate(cell.date)}
                   className={`
                     cursor-pointer hover:text-theme-accent transition-colors
                     ${cell.isCurrentMonth ? 'text-theme-text dark:text-[#DFE3FA]' : 'text-black/10 dark:text-white/10'}
                     ${active ? '!text-theme-accent' : ''}
                   `}
                 >
                   {cell.date.getDate()}
                 </div>
               );
             })}
          </div>
        </div>
      )}
    </div>
  );
}

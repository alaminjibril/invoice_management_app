import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FilterControl({ currentFilters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterOptions = ['Draft', 'Pending', 'Paid'];

  const toggleFilter = (filter) => {
    let newFilters = [...currentFilters];
    if (newFilters.includes(filter)) {
      newFilters = newFilters.filter(f => f !== filter);
    } else {
      newFilters.push(filter);
    }
    onFilterChange(newFilters);
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center font-bold text-[15px] cursor-pointer text-theme-text dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hidden md:inline font-bold">Filter by status</span>
        <span className="md:hidden font-bold">Filter</span>
        <ChevronDown size={14} className={`ml-3 text-theme-accent transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-10 flex flex-col gap-4 left-1/2 -translate-x-1/2 w-[192px] bg-white dark:bg-[#252945] rounded-lg shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.25)] p-6 z-20">
          {filterOptions.map((filter) => {
            const isChecked = currentFilters.includes(filter);
            return (
              <label key={filter} className="flex items-center gap-4 cursor-pointer group select-none" onClick={(e) => { e.preventDefault(); toggleFilter(filter); }}>
                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors
                  ${isChecked 
                    ? 'bg-theme-accent border-theme-accent' 
                    : 'bg-[#DFE3FA] border-transparent dark:bg-[#1E2139] dark:border-transparent group-hover:border-theme-accent dark:group-hover:border-theme-accent'}
                `}>
                  {isChecked && (
                    <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 4.5l2.124 2.124L8.97 1.28" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
                  )}
                </div>
                <span className="font-bold text-[15px] text-theme-text dark:text-white capitalize">{filter}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

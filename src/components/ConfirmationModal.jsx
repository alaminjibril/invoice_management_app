import { useEffect } from 'react';

export default function ConfirmationModal({ isOpen, onConfirm, onCancel, title, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onCancel();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/50 p-6">
      <div 
        className="bg-theme-card dark:bg-theme-card-dark rounded-lg p-8 md:p-12 w-full max-w-[480px] shadow-xl animate-fadeIn relative"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="mb-4 text-[24px] tracking-[-0.5px] text-theme-text dark:text-white">{title}</h2>
        <p className="text-theme-secondary dark:text-theme-secondary-dark mb-4 text-[13px] leading-[22px]">{message}</p>
        <div className="flex justify-end gap-2 mt-8">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

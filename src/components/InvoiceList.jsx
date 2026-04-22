import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import { ChevronRight } from 'lucide-react';

export default function InvoiceList({ invoices, onRowClick }) {
  return (
    <div className="flex flex-col gap-4">
      {invoices.map((invoice) => (
        <div 
          key={invoice.id} 
          className="bg-white dark:bg-theme-card-dark rounded-lg p-6 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] dark:shadow-[0_10px_10px_-10px_rgba(0,0,0,0.1)] hover:border-theme-accent border border-transparent transition-all cursor-pointer flex justify-between gap-6"
          onClick={() => onRowClick(invoice)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onRowClick(invoice); }}
        >
          {/* Desktop & Tablet Layout (`md:flex`) */}
          <div className="hidden md:flex flex-row items-center justify-between w-full">
            <span className="font-bold text-[15px] w-[90px]"><span className="text-[#888EB0] text-[15px]">#</span>{invoice.invoiceNumber}</span>
            <span className="text-theme-secondary dark:text-theme-secondary-dark w-[140px]">Due {formatDate(invoice.dueDate)}</span>
            <span className="text-[#858BB2] dark:text-white flex-1">{invoice.clientName}</span>
            <span className="font-bold text-[15px] w-[120px] text-right mr-10">{formatCurrency(invoice.total || 0)}</span>
            <StatusBadge status={invoice.status} />
            <div className="ml-4 flex items-center justify-center">
              <ChevronRight size={14} className="text-theme-accent" strokeWidth={3} />
            </div>
          </div>

          {/* Mobile Layout (`md:hidden`) */}
          <div className="md:hidden flex flex-col w-full">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-[15px]"><span className="text-[#888EB0]">#</span>{invoice.invoiceNumber}</span>
              <span className="text-[#858BB2] dark:text-white">{invoice.clientName}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <span className="text-theme-secondary dark:text-theme-secondary-dark">Due {formatDate(invoice.dueDate)}</span>
                <span className="font-bold text-[15px]">{formatCurrency(invoice.total || 0)}</span>
              </div>
              <StatusBadge status={invoice.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { ChevronLeft } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function InvoiceDetail({ invoice, onBack, onEdit, onDelete, onStatusChange }) {
  if (!invoice) return null;

  return (
    <div className="w-full pb-28 md:pb-0 relative">
      <button className="flex items-center gap-6 font-bold text-[15px] pt-8 mb-8 text-theme-text dark:text-white hover:text-[#7E88C3]" onClick={onBack}>
        <ChevronLeft size={14} className="text-theme-accent" strokeWidth={3} />
        Go back
      </button>

      {/* Header Bar */}
      <div className="bg-theme-card dark:bg-theme-card-dark rounded-lg p-6 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] mb-6 flex justify-between items-center z-10 relative">
        <div className="flex justify-between md:justify-start items-center gap-4 w-full md:w-auto">
          <span className="text-[#858BB2] dark:text-[#DFE3FA]">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <button className="btn btn-secondary px-6" onClick={onEdit} disabled={invoice.status === 'Paid'}>
            Edit
          </button>
          <button className="btn btn-danger px-6" onClick={onDelete} disabled={invoice.status === 'Paid'}>
            Delete
          </button>
          
          {invoice.status !== 'Paid' && (
            <button className="btn btn-primary px-6 leading-tight flex-shrink-0 whitespace-nowrap" onClick={() => onStatusChange(invoice.id, 'Paid')}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {/* Body Details */}
      <div className="bg-theme-card dark:bg-theme-card-dark rounded-lg p-6 md:p-12 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]">
        
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="flex flex-col">
            <h2 className="text-[14px] md:text-[24px] mb-2"><span className="text-[#888EB0] text-[14px] md:text-[24px]">#</span>{invoice.invoiceNumber}</h2>
            <p className="text-theme-secondary dark:text-theme-secondary-dark">{invoice.description || 'Graphic Design'}</p>
          </div>
          <div className="text-left md:text-right text-[13px] text-theme-secondary dark:text-theme-secondary-dark leading-tight flex flex-col gap-1">
            <p>19 Union Terrace</p>
            <p>London</p>
            <p>E1 3EZ</p>
            <p>United Kingdom</p>
            {/* The design has hardcoded address, I'll provide fallback to real form data but right now keep it simple like design for Bill From */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-[100px] mb-12">
          <div className="flex flex-row gap-16 md:gap-[100px]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-theme-secondary dark:text-theme-secondary-dark">Invoice Date</p>
                <h3 className="text-[15px]">{formatDate(invoice.issueDate)}</h3>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-theme-secondary dark:text-theme-secondary-dark">Payment Due</p>
                <h3 className="text-[15px]">{formatDate(invoice.dueDate)}</h3>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-theme-secondary dark:text-theme-secondary-dark">Bill To</p>
              <h3 className="text-[15px] mb-2">{invoice.clientName}</h3>
              <div className="text-theme-secondary dark:text-theme-secondary-dark text-[13px] leading-tight flex flex-col gap-1">
                <p>84 Church Way</p>
                <p>Bradford</p>
                <p>BD1 9PB</p>
                <p>United Kingdom</p>
                {/* using dummy address as client addresses aren't fully configured in data yet */}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mt-8 md:mt-0">
            <p className="text-theme-secondary dark:text-theme-secondary-dark">Sent to</p>
            <h3 className="text-[15px]">{invoice.clientEmail}</h3>
          </div>
        </div>

        {/* Item Table styled exactly like frontend mentor */}
        <div className="rounded-lg overflow-hidden mt-10">
          <table className="w-full bg-[#F9FAFE] dark:bg-[#252945]">
            <thead className="hidden md:table-header-group">
              <tr className="text-left text-[13px] font-medium text-theme-secondary dark:text-theme-secondary-dark border-b border-transparent">
                <th className="py-8 px-8 font-medium">Item Name</th>
                <th className="py-8 font-medium text-center font-family">QTY.</th>
                <th className="py-8 font-medium text-right">Price</th>
                <th className="py-8 px-8 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={item.id} className="text-[15px] font-bold">
                  <td className={`p-6 md:p-8 md:py-4 ${idx === 0 ? 'md:pt-8' : ''} ${idx === invoice.items.length - 1 ? 'md:pb-10' : ''}`}>
                    <div className="mb-2 md:mb-0 text-theme-text dark:text-white font-bold">{item.name}</div>
                    <div className="text-theme-secondary font-bold md:hidden">
                      {item.quantity} x {formatCurrency(item.price)}
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-center text-theme-secondary dark:text-theme-secondary-dark">
                    {item.quantity}
                  </td>
                  <td className="hidden md:table-cell text-right text-theme-secondary dark:text-theme-secondary-dark">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="text-right p-6 md:p-8 bg-transparent text-theme-text dark:text-white">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-[#373B53] dark:bg-[#0C0E16] p-6 md:px-8 md:py-6 flex items-center justify-between text-white rounded-b-lg">
            <span className="text-[13px]"><span className="md:hidden">Grand Total</span><span className="hidden md:inline">Amount Due</span></span>
            <span className="text-[24px] font-bold">{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-theme-card-dark px-6 py-6 flex justify-center gap-2 z-20 shadow-[0_-20px_30px_rgba(0,0,0,0.05)]">
        <button className="btn btn-secondary flex-1 sm:flex-none px-6" onClick={onEdit} disabled={invoice.status === 'Paid'}>
          Edit
        </button>
        <button className="btn btn-danger flex-1 sm:flex-none px-6" onClick={onDelete} disabled={invoice.status === 'Paid'}>
          Delete
        </button>
        {invoice.status !== 'Paid' && (
          <button className="btn btn-primary flex-1 sm:flex-none px-6 whitespace-nowrap" onClick={() => onStatusChange(invoice.id, 'Paid')}>
            Mark as Paid
          </button>
        )}
      </div>
    </div>
  );
}

import { useLocalStorage } from './useLocalStorage';

export function useInvoices() {
  const [invoices, setInvoices] = useLocalStorage('invoices-data', []);

  const addInvoice = (invoice) => {
    // invoice should already have id and generated fields
    setInvoices((prev) => [invoice, ...prev]);
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const changeStatus = (id, newStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          // Validate status transitions based on rules
          if (inv.status === 'Paid') return inv; // Paid cannot change status
          if (inv.status === 'Draft' && newStatus === 'Paid') return inv; // Draft must go to pending first
          return { ...inv, status: newStatus, updatedAt: new Date().toISOString() };
        }
        return inv;
      })
    );
  };

  return {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    changeStatus,
  };
}

import { useState } from 'react';
import Header from './components/Header';
import FilterControl from './components/FilterControl';
import InvoiceList from './components/InvoiceList';
import EmptyState from './components/EmptyState';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm';
import ConfirmationModal from './components/ConfirmationModal';
import { useInvoices } from './hooks/useInvoices';
import { Plus } from 'lucide-react';

function App() {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, changeStatus } = useInvoices();

  const [currentView, setCurrentView] = useState('list'); // 'list', 'detail'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [currentFilters, setCurrentFilters] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const selectedInvoice = invoices.find(inv => inv.id === selectedInvoiceId);

  // Filters & Counts
  const filteredInvoices = invoices.filter(inv => {
    if (currentFilters.length === 0) return true;
    return currentFilters.includes(inv.status);
  });

  let headerText = "No invoices";
  let mobileHeaderText = "No invoices";
  
  if (filteredInvoices.length > 0) {
    if (currentFilters.length === 1) {
      headerText = `There are ${filteredInvoices.length} ${currentFilters[0].toLowerCase()} invoices`;
      mobileHeaderText = `${filteredInvoices.length} ${currentFilters[0].toLowerCase()} invoices`;
    } else {
      headerText = `There are ${filteredInvoices.length} total invoices`;
      mobileHeaderText = `${filteredInvoices.length} invoices`;
    }
  }

  // Handlers
  const handleCreateNew = () => {
    setSelectedInvoiceId(null);
    setIsFormOpen(true);
  };

  const handleRowClick = (invoice) => {
    setSelectedInvoiceId(invoice.id);
    setCurrentView('detail');
  };

  const handleEdit = () => {
    setIsFormOpen(true);
  };

  const handleSaveForm = (invoiceData) => {
    if (selectedInvoiceId) {
      updateInvoice(invoiceData);
    } else {
      addInvoice(invoiceData);
    }
    setIsFormOpen(false);
  };

  const renderList = () => (
    <>
      <div className="flex items-center justify-between mt-8 mb-14">
        <div>
          <h1 className="mb-2 text-[32px] tracking-tight font-bold text-theme-text dark:text-white">Invoices</h1>
          <p className="text-theme-secondary dark:text-[#DFE3FA] hidden md:block">
            {headerText}
          </p>
          <p className="text-theme-secondary dark:text-[#DFE3FA] md:hidden">
            {mobileHeaderText}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <FilterControl
            currentFilters={currentFilters}
            onFilterChange={setCurrentFilters}
          />

          <button className="btn btn-primary pl-2 pr-4 py-2 relative text-[15px]" onClick={handleCreateNew}>
            <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-white rounded-full text-theme-accent mr-2 md:mr-3">
              <Plus size={16} strokeWidth={4} />
            </div>
            New Invoice
          </button>
        </div>
      </div>

      {filteredInvoices.length > 0 ? (
        <InvoiceList invoices={filteredInvoices} onRowClick={handleRowClick} />
      ) : (
        <EmptyState
          message="There is nothing here"
          subMessage="Create an invoice by clicking the New Invoice button and get started"
        />
      )}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen pt-[72px] lg:pt-0 lg:pl-[103px]">
      <Header />

      <main className="flex-1 w-full max-w-[730px] mx-auto px-6 py-8 relative">
        {currentView === 'list' && renderList()}

        {/* Detail Panel replacing main layout contextually, or as absolute overlay. 
            The latest design shows detail pushing into the main view exactly like a list view item. */}
        {currentView === 'detail' && (
          <InvoiceDetail
            invoice={selectedInvoice}
            onBack={() => setCurrentView('list')}
            onEdit={handleEdit}
            onDelete={() => setIsDeleteModalOpen(true)}
            onStatusChange={changeStatus}
          />
        )}

        {/* Form Drawer Overlay */}
        {isFormOpen && (
          <div className="fixed inset-0 top-[72px] lg:top-0 lg:left-[103px] z-40 bg-black/50 overflow-hidden flex items-start">
            <div className="bg-white dark:bg-[#141625] w-full max-w-[719px] h-full overflow-hidden animate-slideInLeft relative shadow-[10px_0_24px_rgba(0,0,0,0.1)] lg:rounded-r-[20px] flex flex-col">
              <InvoiceForm
                invoice={selectedInvoice}
                invoices={invoices}
                onSave={handleSaveForm}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        )}
      </main>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete invoice #${selectedInvoice?.invoiceNumber}? This action cannot be undone.`}
        onConfirm={() => {
          deleteInvoice(selectedInvoiceId);
          setIsDeleteModalOpen(false);
          setCurrentView('list');
          setSelectedInvoiceId(null);
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}

export default App;

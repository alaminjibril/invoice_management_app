import { ChevronLeft, Trash } from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';
import { generateId, generateInvoiceNumber } from '../utils/generateId';
import CustomSelect from './CustomSelect';
import DatePicker from './DatePicker';

export default function InvoiceForm({ invoice, invoices, onSave, onCancel }) {
  const isEdit = !!invoice;

  const defaultValues = {
    clientName: '',
    clientEmail: '',
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    issueDate: new Date().toISOString().split('T')[0],
    paymentTerms: 30,
    description: '',
    items: [],
  };

  const initialValues = isEdit ? { ...invoice } : defaultValues;
  const { values, setValues, errors, touched, handleChange, handleBlur, validateAll } = useFormValidation(initialValues);

  const handleAddItem = () => {
    const newItem = { id: generateId(), name: '', quantity: 1, price: 0, total: 0 };
    setValues(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleRemoveItem = (id) => {
    setValues(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }));
  };

  const handleItemChange = (id, field, value) => {
    setValues(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'price') {
            const qty = field === 'quantity' ? Number(value) : Number(item.quantity);
            const price = field === 'price' ? Number(value) : Number(item.price);
            updatedItem.total = qty * price;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const calculateTotal = (items) => items.reduce((sum, item) => sum + (item.total || 0), 0);

  const handleSubmit = (e, asDraft = false) => {
    e.preventDefault();
    if (!asDraft && !validateAll()) {
      return;
    }

    const subtotal = calculateTotal(values.items);

    // Calculate accurate due date
    const iDate = new Date(values.issueDate);
    const dueDateObj = new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate() + values.paymentTerms);
    const calculatedDueDate = `${dueDateObj.getFullYear()}-${String(dueDateObj.getMonth() + 1).padStart(2, '0')}-${String(dueDateObj.getDate()).padStart(2, '0')}`;

    const invoiceToSave = {
      ...values,
      dueDate: calculatedDueDate,
      subtotal,
      tax: 0,
      discount: 0,
      total: subtotal,
      status: asDraft ? 'Draft' : (isEdit && values.status !== 'Draft' ? values.status : 'Pending'),
      id: isEdit ? values.id : generateId(),
      invoiceNumber: isEdit ? values.invoiceNumber : generateInvoiceNumber(invoices),
      createdAt: isEdit ? values.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(invoiceToSave);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#141625] relative rounded-r-[20px]">
      <div className="flex-1 overflow-y-auto relative px-6 md:px-14 pt-14 pb-12" id="invoice-form-scroll">
        <button type="button" className="lg:hidden flex items-center gap-6 font-bold mb-6 text-theme-text dark:text-white" onClick={onCancel}>
          <ChevronLeft size={14} className="text-theme-accent" strokeWidth={3} />
          Go back
        </button>

        <h2 className="mb-12">
          {isEdit ? <span className="flex gap-2 text-[24px] font-bold">Edit <span className="text-[#888EB0] text-[24px] font-bold">#</span>{values.invoiceNumber}</span> : 'New Invoice'}
        </h2>

        <form>
          {/* Bill From */}
          <fieldset className="border-none mb-12">
            <legend className="text-theme-accent font-bold mb-6">Bill From</legend>

            <div className="mb-6 relative">
              <label className={`form-label flex justify-between ${touched['senderAddress.street'] && errors['senderAddress.street'] ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                Street Address {touched['senderAddress.street'] && errors['senderAddress.street'] && <span className="font-normal text-theme-danger">{errors['senderAddress.street']}</span>}
              </label>
              <input type="text" name="senderAddress.street" value={values.senderAddress?.street || ''} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched['senderAddress.street'] && errors['senderAddress.street'] ? 'border-theme-danger' : ''} font-bold`} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="relative">
                <label className={`form-label flex justify-between ${touched['senderAddress.city'] && errors['senderAddress.city'] ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                  City {touched['senderAddress.city'] && errors['senderAddress.city'] && <span className="font-normal text-theme-danger">{errors['senderAddress.city']}</span>}
                </label>
                <input type="text" name="senderAddress.city" value={values.senderAddress?.city || ''} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched['senderAddress.city'] && errors['senderAddress.city'] ? 'border-theme-danger' : ''} font-bold`} />
              </div>
              <div className="relative">
                <label className={`form-label flex justify-between ${touched['senderAddress.postCode'] && errors['senderAddress.postCode'] ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                  Post Code {touched['senderAddress.postCode'] && errors['senderAddress.postCode'] && <span className="font-normal text-theme-danger">{errors['senderAddress.postCode']}</span>}
                </label>
                <input type="text" name="senderAddress.postCode" value={values.senderAddress?.postCode || ''} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched['senderAddress.postCode'] && errors['senderAddress.postCode'] ? 'border-theme-danger' : ''} font-bold`} />
              </div>
              <div className="col-span-2 md:col-span-1 relative">
                <label className={`form-label flex justify-between ${touched['senderAddress.country'] && errors['senderAddress.country'] ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                  Country {touched['senderAddress.country'] && errors['senderAddress.country'] && <span className="font-normal text-theme-danger">{errors['senderAddress.country']}</span>}
                </label>
                <input type="text" name="senderAddress.country" value={values.senderAddress?.country || ''} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched['senderAddress.country'] && errors['senderAddress.country'] ? 'border-theme-danger' : ''} font-bold`} />
              </div>
            </div>
          </fieldset>

          {/* Bill To */}
          <fieldset className="border-none mb-12">
            <legend className="text-theme-accent font-bold mb-6">Bill To</legend>
            <div className="mb-6 relative">
              <label className={`form-label flex justify-between ${touched.clientName && errors.clientName ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                Client's Name {touched.clientName && errors.clientName && <span className="font-normal text-theme-danger">{errors.clientName}</span>}
              </label>
              <input
                type="text"
                name="clientName"
                className={`form-input ${touched.clientName && errors.clientName ? 'border-theme-danger' : ''} font-bold`}
                value={values.clientName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="mb-6 relative">
              <label className={`form-label flex justify-between ${touched.clientEmail && errors.clientEmail ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                Client's Email {touched.clientEmail && errors.clientEmail && <span className="font-normal text-theme-danger">{errors.clientEmail}</span>}
              </label>
              <input
                type="email"
                name="clientEmail"
                className={`form-input ${touched.clientEmail && errors.clientEmail ? 'border-theme-danger' : ''} font-bold`}
                value={values.clientEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="mb-6 relative">
              <label className={`form-label flex justify-between ${touched['clientAddress.street'] && errors['clientAddress.street'] ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                Street Address {touched['clientAddress.street'] && errors['clientAddress.street'] && <span className="font-normal text-theme-danger">{errors['clientAddress.street']}</span>}
              </label>
              <input type="text" name="clientAddress.street" value={values.clientAddress?.street || ''} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched['clientAddress.street'] && errors['clientAddress.street'] ? 'border-theme-danger' : ''} font-bold`} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div className="relative">
                <label className={`form-label flex justify-between ${touched['clientAddress.city'] && errors['clientAddress.city'] ? 'text-theme-danger dark:text-theme-danger' : ''} `}>
                  City {touched['clientAddress.city'] && errors['clientAddress.city'] && <span className="font-normal text-theme-danger">{errors['clientAddress.city']}</span>}
                </label>
                <input type="text" name="clientAddress.city" value={values.clientAddress?.city || ''} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched['clientAddress.city'] && errors['clientAddress.city'] ? 'border-theme-danger' : ''} font-bold`} />
              </div>
              <div className="relative">
                <label className={`form-label flex justify-between ${touched['clientAddress.postCode'] && errors['clientAddress.postCode'] ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                  Post Code {touched['clientAddress.postCode'] && errors['clientAddress.postCode'] && <span className="font-normal text-theme-danger">{errors['clientAddress.postCode']}</span>}
                </label>
                <input type="text" name="clientAddress.postCode" value={values.clientAddress?.postCode || ''} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched['clientAddress.postCode'] && errors['clientAddress.postCode'] ? 'border-theme-danger' : ''} font-bold`} />
              </div>
              <div className="col-span-2 md:col-span-1 relative">
                <label className={`form-label flex justify-between ${touched['clientAddress.country'] && errors['clientAddress.country'] ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                  Country {touched['clientAddress.country'] && errors['clientAddress.country'] && <span className="font-normal text-theme-danger">{errors['clientAddress.country']}</span>}
                </label>
                <input type="text" name="clientAddress.country" value={values.clientAddress?.country || ''} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched['clientAddress.country'] && errors['clientAddress.country'] ? 'border-theme-danger' : ''} font-bold`} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="form-label flex justify-between">
                  Invoice Date {touched.issueDate && errors.issueDate && <span className="text-theme-danger font-normal">{errors.issueDate}</span>}
                </label>
                <DatePicker
                  selectedDate={values.issueDate}
                  onChange={(dateStr) => handleChange({ target: { name: 'issueDate', value: dateStr } })}
                  error={touched.issueDate && !!errors.issueDate}
                />
              </div>
              <div className="relative">
                <label className="form-label flex justify-between">
                  Payment Terms {touched.paymentTerms && errors.paymentTerms && <span className="text-theme-danger font-normal">{errors.paymentTerms}</span>}
                </label>
                <CustomSelect
                  options={[
                    { label: 'Net 1 Day', value: 1 },
                    { label: 'Net 7 Days', value: 7 },
                    { label: 'Net 14 Days', value: 14 },
                    { label: 'Net 30 Days', value: 30 },
                  ]}
                  value={values.paymentTerms}
                  onChange={(numValue) => handleChange({ target: { name: 'paymentTerms', value: numValue } })}
                  error={touched.paymentTerms && !!errors.paymentTerms}
                />
              </div>
            </div>

            <div className="mb-6 relative">
              <label className={`form-label flex justify-between ${touched.description && errors.description ? 'text-theme-danger dark:text-theme-danger' : ''}`}>
                Project Description {touched.description && errors.description && <span className="font-normal text-theme-danger">{errors.description}</span>}
              </label>
              <input
                type="text"
                name="description"
                placeholder='e.g. Graphic Design Service'
                className={`form-input ${touched.description && errors.description ? 'border-theme-danger' : ''} font-bold`}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </fieldset>

          <section className="mt-8 mb-24">
            <h2 className="mb-6 text-[18px] text-[#777F98]" style={{ letterSpacing: '-0.38px' }}>Item List</h2>

            {errors.items && <div className="text-theme-danger mb-4">{errors.items}</div>}

            <div className="flex flex-col gap-12 md:gap-4 md:mb-4">
              {/* Header row for desktop */}
              <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-4 mb-2">
                <label className="form-label mb-0">Item Name</label>
                <label className="form-label mb-0">Qty.</label>
                <label className="form-label mb-0">Price</label>
                <label className="form-label mb-0">Total</label>
                <span className="w-4"></span>
              </div>

              {values.items.map((item, index) => {
                const itemErr = errors.itemsList && errors.itemsList[index] ? errors.itemsList[index] : {};
                return (
                  <div key={item.id} className="grid grid-cols-[1fr_1fr_1fr_auto] md:grid-cols-[3fr_1fr_1fr_1fr_auto] gap-4 items-center">
                    <div className="col-span-3 md:col-span-1">
                      <label className="form-label md:hidden">Item Name</label>
                      <input
                        type="text"
                        className={`form-input ${itemErr.name ? 'border-theme-danger' : ''} font-bold`}
                        value={item.name}
                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="form-label md:hidden">Qty.</label>
                      <input
                        type="number"
                        min="1"
                        className={`form-input px-2 text-center ${itemErr.quantity ? 'border-theme-danger' : ''}font-bold`}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="form-label md:hidden">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={`form-input px-2 ${itemErr.price ? 'border-theme-danger' : ''}font-bold`}
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col h-full justify-center">
                      <label className="form-label md:hidden">Total</label>
                      <div className="text-theme-secondary dark:text-theme-secondary-dark font-bold bg-transparent pt-3 md:pt-0">
                        {item.total.toFixed(2)}
                      </div>
                    </div>
                    <button type="button" className="text-[#888EB0] hover:text-theme-danger transition-colors self-end pb-4 md:self-center md:pb-0" onClick={() => handleRemoveItem(item.id)}>
                      <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                        <path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H3.194a1.777 1.777 0 01-1.777-1.778V3.556h10.166zM8.45 0l1.272 1.277h3.278v1.778H0V1.277h3.278L4.55 0h3.899z" fillRule="nonzero" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="btn btn-secondary w-full justify-center mt-4 
  bg-[#F9FAFE] text-theme-secondary hover:bg-[#DFE3FA] 
  dark:bg-[#252945] dark:text-[#DFE3FA] 
  dark:hover:text-[#DFE3FA] dark:hover:bg-white"
              onClick={handleAddItem}
            >
              + Add New Item
            </button>

            {/* Global Summary Error Block */}
            {Object.keys(errors).length > 0 && Object.values(touched).some(t => t === true) && (
              <div className="text-theme-danger text-[10px] font-bold mt-8 flex flex-col gap-1">
                {Object.keys(errors).some(k => k !== 'items' && k !== 'itemsList') && <p>- All fields must be added</p>}
                {errors.items && <p>{errors.items}</p>}
              </div>
            )}
          </section>
        </form>
      </div>

      {/* Fixed Bottom Actions - Using negative margins to expand boundary cleanly or padding wrapping */}
      {/* We pinned it exactly to the element box width */}
      <div className="w-full flex items-center justify-between p-6 px-6 md:px-14 bg-white dark:bg-[#141625] lg:rounded-br-[20px] lg:rounded-bl-none shadow-[0_-20px_30px_rgba(0,0,0,0.05)] z-10 shrink-0 relative">
        {isEdit ? (
          <>
            <div />
            <div className="flex items-center gap-2">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e, false)}>Save Changes</button>
            </div>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-secondary dark:bg-white dark:text-[#7E88C3] dark:hover:bg-[#252945] dark:hover:text-[#DFE3FA]" onClick={onCancel}>Discard</button>
            <div className="flex items-center gap-2">
              <button type="button" className="btn btn-dark" onClick={(e) => handleSubmit(e, true)}>Save as Draft</button>
              <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e, false)}>Save & Send</button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

import emptyIllustration from '../assets/Email campaign_Flatline.png';

export default function EmptyState({ message, subMessage }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-24">
      <img src={emptyIllustration} alt="Empty illustration" className="w-[242px] h-[200px] mb-16" />
      <h2 className="mb-4 text-[24px] font-bold tracking-[-0.75px]">{message || 'No invoices found'}</h2>
      <p className="text-theme-secondary dark:text-theme-secondary-dark w-[220px]">
        {subMessage || 'Try modifying your filter or create a new invoice.'}
      </p>
    </div>
  );
}

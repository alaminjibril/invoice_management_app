export default function StatusBadge({ status }) {
  const mapping = {
    Draft: { text: 'text-theme-draft dark:text-theme-draft', bg: 'bg-theme-draft-bg dark:bg-white/5', dot: 'bg-theme-draft dark:bg-theme-draft' },
    Pending: { text: 'text-theme-warning dark:text-theme-warning', bg: 'bg-theme-warning-bg', dot: 'bg-theme-warning dark:bg-theme-warning' },
    Paid: { text: 'text-theme-success dark:text-theme-success', bg: 'bg-theme-success-bg', dot: 'bg-theme-success dark:bg-theme-success' }
  };
  
  const current = mapping[status || 'Draft'];
  
  return (
    <div className={`flex items-center justify-center gap-2 w-[104px] h-[40px] rounded-md bg-opacity-5 ${current.bg} ${current.text}`}>
      <span className={`w-2 h-2 rounded-full ${current.dot}`}></span>
      <span className="font-bold text-[15px] capitalize pt-1 leading-none">{status || 'Draft'}</span>
    </div>
  );
}

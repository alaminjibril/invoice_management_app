import { useThemeContext } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import avatarImg from '../assets/Oval.png';

export default function Header() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <aside className="fixed top-0 left-0 w-full h-[72px] z-50 bg-theme-sidebar dark:bg-theme-sidebar-dark flex justify-between lg:flex-col lg:w-[103px] lg:h-screen lg:rounded-r-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] md:shadow-none">
      <div className="relative w-[72px] h-full bg-theme-accent rounded-r-[20px] flex items-center justify-center overflow-hidden lg:w-full lg:h-[103px]">
        {/* Hover curve background graphic */}
        <div className="absolute top-1/2 left-0 w-full h-full bg-theme-accent-hover rounded-tl-[20px] z-0"></div>
        {/* Logo Icon logic recreated directly */}
        <div className="relative z-10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26"><path fill="#FFF" fillRule="evenodd" d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"/></svg>
        </div>
      </div>
      
      <div className="flex items-center lg:flex-col">
        <button 
          className="w-[72px] h-full flex items-center justify-center text-[#858BB2] hover:text-[#DFE3FA] transition-colors lg:w-full lg:h-[72px]"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div className="w-[72px] h-full flex items-center justify-center border-l border-[#494E6E] lg:w-full lg:h-[88px] lg:border-l-0 lg:border-t">
          <img src={avatarImg} alt="User Avatar" className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] rounded-full" />
        </div>
      </div>
    </aside>
  );
}

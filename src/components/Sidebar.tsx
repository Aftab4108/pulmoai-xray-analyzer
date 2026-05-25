import { LayoutDashboard, Users, Activity, Settings, Plus, HelpCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewAnalysisClick: () => void;
  onShowHelpClick: () => void;
  onLogoutClick: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onNewAnalysisClick,
  onShowHelpClick,
  onLogoutClick,
}: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'records', label: 'Patient Records', icon: Users },
    { id: 'analytics', label: 'Analysis', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col py-8 bg-white dark:bg-[#0f172a] border-r border-[#eceef0] dark:border-[#1e293b] z-50 transition-colors duration-300">
      {/* Branding Header */}
      <div className="px-6 mb-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#006a61] flex items-center justify-center text-white font-black text-lg">P</div>
          <h1 className="text-xl font-black text-[#131b2e] dark:text-white tracking-tight">PulmoAI</h1>
        </div>
        <p className="text-xs font-semibold text-[#45464d] dark:text-[#94a3b8] mt-1 opacity-70">Medical Diagnostic AI</p>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? 'text-[#006a61] dark:text-[#86f2e4] border-r-2 border-[#006a61] dark:border-[#86f2e4] font-bold bg-[#f2f4f6]/50 dark:bg-[#131b2e]/50'
                  : 'text-[#45464d] dark:text-[#94a3b8] hover:bg-[#f2f4f6] dark:hover:bg-[#1e293b] hover:text-[#131b2e] dark:hover:text-white'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-[#006a61] dark:text-[#86f2e4]' : ''} />
              <span className="text-sm font-semibold tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Action & Footers */}
      <div className="mt-auto px-4 space-y-4">
        <button
          onClick={onNewAnalysisClick}
          className="w-full bg-[#131b2e] dark:bg-[#006a61] hover:bg-[#1e293b] dark:hover:bg-[#005049] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          <span>New Analysis</span>
        </button>

        <div className="pt-4 border-t border-[#eceef0] dark:border-[#1e293b] space-y-1">
          <button
            onClick={onShowHelpClick}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-xs font-semibold text-[#45464d] dark:text-[#94a3b8] hover:bg-[#f2f4f6] dark:hover:bg-[#1e293b] hover:text-[#131b2e] dark:hover:text-white rounded-lg transition-colors"
          >
            <HelpCircle size={15} />
            <span>Help Guide</span>
          </button>
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-xs font-semibold text-[#45464d] dark:text-[#94a3b8] hover:bg-[#f2f4f6] dark:hover:bg-[#1e293b] hover:text-red-500 rounded-lg transition-colors"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

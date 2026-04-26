import React from 'react';

const BottomNav = () => {
  const items = [
    { label: 'EXPLORE', icon: '🧭', active: false },
    { label: 'SEARCH', icon: '🔍', active: true },
    { label: 'BOOKINGS', icon: '📅', active: false },
    { label: 'SOS', icon: '❄️', active: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-3 flex justify-between items-center z-50">
      {items.map((item) => (
        <div key={item.label} className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${item.active ? 'bg-[#0F172A] text-white shadow-lg' : 'text-slate-400'}`}>
          <span className="text-lg">{item.icon}</span>
          {item.active && <span className="text-[0.6rem] font-black tracking-widest leading-none">{item.label}</span>}
        </div>
      ))}
    </div>
  );
};

export default BottomNav;

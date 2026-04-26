import React from 'react';

const DoctorCard = ({ name, specialty, experience, languages, rating, color, onBook }) => {
  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-md border border-slate-50 flex flex-col slide-up min-w-[240px] md:min-w-0">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4" style={{ backgroundColor: color || '#E2F2F0' }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
        <div className="absolute top-3 right-3 bg-[#0F172A] text-white px-2 py-1 rounded-lg text-[0.65rem] font-bold flex items-center gap-1 shadow-md">
          <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          {rating.toFixed(1)}
        </div>
        <div className="w-full h-full flex items-center justify-center text-4xl">👨‍⚕️</div>
      </div>

      <div className="grow">
        <h3 className="text-[1.1rem] font-black text-[#0F172A] leading-tight mb-1">{name}</h3>
        <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-wide mb-3">{specialty} • {experience}Y Exp</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {languages.map(lang => (
            <span key={lang} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[0.6rem] font-black tracking-widest uppercase">
              {lang}
            </span>
          ))}
        </div>
      </div>

      <button onClick={onBook} className="w-full border-2 border-[#10B981] text-[#10B981] font-black text-[0.7rem] tracking-widest uppercase py-3 rounded-full hover:bg-[#10B981] hover:text-white transition-all active:scale-95 shadow-sm">
        Book Consultation
      </button>
    </div>
  );
};

export default DoctorCard;

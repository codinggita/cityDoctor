import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AVAILABILITY_MOCK } from '../utils/helpers';

const DoctorDetailPage = () => {
  const navigate = useNavigate();
  const [visitType, setVisitType] = useState('walkin');

  return (
    <div className="min-h-screen bg-bgLight">
      <Navbar />

      <main className="px-8 py-12 max-w-4xl mx-auto pb-32">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm font-medium text-textMuted">
          <button onClick={() => navigate('/home')} className="hover:text-primary transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/search')} className="hover:text-primary transition-colors">Find a Doctor</button>
          <span>/</span>
          <span className="text-primary font-bold">Dr. Arjun Sharma</span>
        </div>

        {/* Doctor Identity */}
        <div className="modern-card p-10 flex flex-col md:flex-row items-center gap-10 mb-12">
          <div className="relative">
            <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-bgLight shadow-xl">
              <img src="https://ui-avatars.com/name/Arjun+Sharma?background=A8E063&color=1A6B3C&size=512" alt="Dr" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-xs">✅</span>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-display font-bold text-textMain mb-2">Dr. Arjun Sharma</h1>
            <p className="text-lg font-medium text-textMuted mb-6">Senior Cardiologist • 12 Years of Excellence</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {['ENGLISH', 'HINDI'].map(l => (
                <span key={l} className="bg-bgLight text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border border-borderSoft uppercase italic">{l}</span>
              ))}
            </div>
          </div>

          <div className="md:ml-auto text-center">
            <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/10">
              <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-2">CONSULTATION FEE</p>
              <p className="text-3xl font-bold">₹1,200</p>
              <p className="text-[0.6rem] font-medium opacity-40 mt-1 uppercase">Inclusive of all travel taxes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="text-2xl font-display font-bold text-textMain mb-6">About the Specialist</h2>
              <p className="text-lg text-textMuted leading-relaxed font-medium">
                Dr. Sharma is a globally recognized cardiologist specializing in non-invasive cardiac procedures. He has served as a lead consultant for several international medical relief missions and is highly rated by travelers for his clear communication and patient-first approach.
              </p>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-bold text-textMain">Traveler Reviews</h2>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-textMain">4.9</span>
                    <span className="text-secondary text-sm">★★★★★</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {[1].map(r => (
                  <div key={r} className="modern-card p-8 group">
                    <div className="flex gap-5 mb-6">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary font-bold">MB</div>
                      <div>
                        <p className="font-bold text-textMain">Marcus Bennett</p>
                        <p className="text-xs font-medium text-textMuted uppercase tracking-wide">2 days ago • Travel medical emergency</p>
                      </div>
                      <div className="ml-auto text-secondary text-sm">★★★★★</div>
                    </div>
                    <p className="text-base text-textMuted font-medium leading-relaxed italic border-l-4 border-accent/30 pl-6 group-hover:border-primary transition-colors">
                      "Dr. Sharma was incredible. As a traveler, I was stressed about my heart rate spikes. He saw me within 20 mins and explained everything clearly in English."
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            {/* Availability Sidebar */}
            <div className="modern-card p-8 sticky top-28">
              <h3 className="text-xl font-display font-bold text-textMain mb-6 text-center">Check Availability</h3>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {AVAILABILITY_MOCK.slice(0, 6).map((item) => (
                  <div key={item.date} className={`p-3 rounded-xl flex flex-col items-center text-center border transition-all cursor-pointer ${
                    item.type === 'active' ? 'bg-primary border-primary text-white shadow-lg scale-105' : 
                    'bg-white border-borderSoft text-textMuted hover:border-secondary'
                  }`}>
                    <p className="text-[0.6rem] font-bold opacity-60 uppercase mb-1">{item.day}</p>
                    <p className="text-xl font-bold">{item.date}</p>
                  </div>
                ))}
              </div>
              <button className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-sm tracking-wide shadow-md hover:bg-success transition-all active:scale-95">
                Request Slot
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-bgLight via-bgLight to-transparent z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between modern-card p-6 border-white shadow-2xl">
            <div className="hidden md:block">
                <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-1">SELECTED SPECIALIST</p>
                <p className="text-xl font-display font-bold text-primary">Dr. Arjun Sharma</p>
            </div>
            <div className="flex items-center gap-6 grow md:grow-0">
                <div className="text-right">
                    <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-1 leading-none">TOTAL FEE</p>
                    <p className="text-2xl font-bold text-textMain leading-none">₹1,200</p>
                </div>
                <button 
                  onClick={() => navigate(`/book/${1}`)}
                  className="bg-primary hover:bg-secondary text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.1em] shadow-xl transition-all active:scale-95 grow md:grow-0"
                >
                  Book Appointment 📅
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;


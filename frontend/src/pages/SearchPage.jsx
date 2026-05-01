import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DoctorGrid from '../components/DoctorGrid';
import MapView from '../components/MapView';


const SearchPage = () => {

  return (
    <div className="min-h-screen bg-bgLight">
      <Navbar />
      
      <Hero 
        title="Find Verified Specialists Nearby"
        subtitle="Search through our curated list of English-speaking healthcare providers in Mumbai."
      />

      <main className="px-8 pt-12 pb-32 max-w-7xl mx-auto">
        <div className="mb-12 slide-up stagger-1">
            <h3 className="text-xl font-display font-bold text-textMain mb-6">Explore Nearby Specialists</h3>
            <MapView />
        </div>
        <DoctorGrid />

        {/* Local Cost Guide (Green Theme) */}
        <div className="mt-24 modern-card p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <p className="text-xs font-bold tracking-[0.2em] mb-4 text-primary uppercase">Treatment Price Guide</p>
            <h3 className="text-3xl font-display font-bold mb-10 text-textMain max-w-md">
                Estimated medical costs in Mumbai South for international travelers.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="bg-bgLight/50 p-6 rounded-2xl border border-borderSoft backdrop-blur-sm">
                    <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-3">CONSULTATION</p>
                    <p className="text-3xl font-bold text-primary">₹1,200 <span className="text-sm font-medium text-textMuted">/ average</span></p>
                </div>
                <div className="bg-bgLight/50 p-6 rounded-2xl border border-borderSoft backdrop-blur-sm">
                    <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-3">DIAGNOSTICS</p>
                    <p className="text-3xl font-bold text-primary">₹2,500 <span className="text-secondary text-xl ml-1">+</span></p>
                </div>
            </div>
            
            <p className="mt-10 text-xs text-textMuted italic leading-relaxed">
                *Rates are estimated based on local luxury healthcare providers. Actual costs may vary depending on clinic location and specific treatment needs.
            </p>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;



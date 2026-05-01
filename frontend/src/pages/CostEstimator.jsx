import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const CostEstimator = () => {
  const [formData, setFormData] = useState({
    city: 'Mumbai',
    treatment: 'General Consultation',
    hospital: 'Private Clinic',
    insurance: 'None'
  });

  const [result, setResult] = useState(null);

  const calculateEstimate = () => {
    // Mock calculation logic
    let base = 500;
    if (formData.treatment === 'Specialist') base = 1200;
    if (formData.treatment === 'Emergency') base = 2500;
    if (formData.treatment === 'Lab Tests') base = 1500;
    if (formData.treatment === 'Surgery') base = 15000;

    let multiplier = 1;
    if (formData.hospital === 'Private Hospital') multiplier = 2;
    if (formData.hospital === 'Premium Hospital') multiplier = 3.5;
    if (formData.hospital === 'Government') multiplier = 0.2;

    let insuranceDiscount = 0;
    if (formData.insurance === 'Travel Insurance') insuranceDiscount = 0.8;
    if (formData.insurance === 'International Insurance') insuranceDiscount = 0.9;

    const total = base * multiplier;
    const finalTotal = total * (1 - insuranceDiscount);

    setResult({
      range: `₹${Math.round(finalTotal * 0.8).toLocaleString()} — ₹${Math.round(finalTotal * 1.2).toLocaleString()}`,
      consultation: Math.round(finalTotal * 0.6),
      lab: Math.round(finalTotal * 0.3),
      medicine: Math.round(finalTotal * 0.1),
      total: Math.round(finalTotal)
    });
  };

  return (
    <div className="min-h-screen bg-bgLight">
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-textMain mb-4">Know Your Medical Costs Before You Go</h1>
          <p className="text-textSecondary font-medium max-w-2xl mx-auto">
            Our estimator uses real-world data from verified healthcare providers in India to help you budget for your health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Estimator Form */}
          <div className="modern-card p-10">
            <h2 className="text-2xl font-display font-bold text-textMain mb-8">Service Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest px-1">Select City</label>
                  <select 
                    className="bg-bgLight border border-borderSoft px-4 py-3 rounded-xl font-bold text-textMain outline-none focus:border-primary"
                    value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                  >
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Bangalore</option>
                    <option>Jaipur</option>
                    <option>Goa</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest px-1">Treatment Type</label>
                  <select 
                    className="bg-bgLight border border-borderSoft px-4 py-3 rounded-xl font-bold text-textMain outline-none focus:border-primary"
                    value={formData.treatment} onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                  >
                    <option>General Consultation</option>
                    <option>Specialist</option>
                    <option>Emergency</option>
                    <option>Lab Tests</option>
                    <option>Surgery</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest px-1">Hospital / Clinic Type</label>
                <select 
                  className="bg-bgLight border border-borderSoft px-4 py-3 rounded-xl font-bold text-textMain outline-none focus:border-primary"
                  value={formData.hospital} onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                >
                  <option>Government</option>
                  <option>Private Clinic</option>
                  <option>Private Hospital</option>
                  <option>Premium Hospital</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest px-1">Your Insurance</label>
                <select 
                  className="bg-bgLight border border-borderSoft px-4 py-3 rounded-xl font-bold text-textMain outline-none focus:border-primary"
                  value={formData.insurance} onChange={(e) => setFormData({...formData, insurance: e.target.value})}
                >
                  <option>None</option>
                  <option>Travel Insurance</option>
                  <option>International Insurance</option>
                </select>
              </div>

              <button 
                onClick={calculateEstimate}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm tracking-wide shadow-soft hover:bg-secondary transition-all active:scale-95"
              >
                Estimate Cost
              </button>
            </div>
          </div>

          {/* Results Card */}
          <div className="min-h-[400px]">
            {result ? (
              <div className="modern-card p-10 slide-up bg-white border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Estimated Range</p>
                <h3 className="text-4xl font-display font-bold text-textMain mb-8">{result.range}</h3>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm font-medium border-b border-bgLight pb-3">
                        <span className="text-textSecondary">Consultation Fee</span>
                        <span className="text-textMain font-bold">₹{result.consultation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium border-b border-bgLight pb-3">
                        <span className="text-textSecondary">Lab Tests & Diagnostics</span>
                        <span className="text-textMain font-bold">₹{result.lab.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium border-b border-bgLight pb-3">
                        <span className="text-textSecondary">Medicine & Pharmacy</span>
                        <span className="text-textMain font-bold">₹{result.medicine.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold pt-2">
                        <span className="text-textMain">Estimated Total</span>
                        <span className="text-primary">₹{result.total.toLocaleString()}</span>
                    </div>
                </div>

                <div className="bg-bgLight p-4 rounded-xl border border-borderSoft mb-8 flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <p className="text-xs font-medium text-textSecondary leading-relaxed">
                        Tip: Carry cash. Many local clinics in {formData.city} may not accept international credit cards.
                    </p>
                </div>

                <button className="w-full bg-bgLight text-primary py-4 rounded-xl font-bold text-sm hover:bg-white border border-primary/20 transition-all">
                    Find Doctors in this range →
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-white/40 rounded-3xl border-2 border-dashed border-borderSoft">
                <div className="text-5xl mb-6 opacity-30">📊</div>
                <h3 className="text-xl font-display font-bold text-textMain/40">Ready to Calculate</h3>
                <p className="text-textSecondary/40 text-sm font-medium">Select your details on the left to see the estimated medical costs.</p>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <section className="mt-24">
            <h2 className="text-3xl font-display font-bold text-textMain mb-10 text-center">Cost Comparison by City</h2>
            <div className="modern-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-bgLight">
                        <tr>
                            <th className="px-8 py-5 text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest">Treatment</th>
                            <th className="px-8 py-5 text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest text-center">Mumbai</th>
                            <th className="px-8 py-5 text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest text-center">Delhi</th>
                            <th className="px-8 py-5 text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest text-center">Bangalore</th>
                            <th className="px-8 py-5 text-[0.7rem] font-bold text-textSecondary uppercase tracking-widest text-center">Goa</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-borderSoft">
                        {[
                            { name: 'General Consultation', mumbai: '₹800+', delhi: '₹700+', bangalore: '₹750+', goa: '₹600+' },
                            { name: 'Specialist Visit', mumbai: '₹1500+', delhi: '₹1400+', bangalore: '₹1600+', goa: '₹1200+' },
                            { name: 'ER Visit (Basic)', mumbai: '₹3000+', delhi: '₹2500+', bangalore: '₹3000+', goa: '₹2000+' },
                            { name: 'MRI Scan', mumbai: '₹6000+', delhi: '₹5500+', bangalore: '₹6500+', goa: '₹7000+' },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-bgLight transition-colors">
                                <td className="px-8 py-6 text-sm font-bold text-textMain">{row.name}</td>
                                <td className="px-8 py-6 text-sm font-medium text-textSecondary text-center">{row.mumbai}</td>
                                <td className="px-8 py-6 text-sm font-medium text-textSecondary text-center">{row.delhi}</td>
                                <td className="px-8 py-6 text-sm font-medium text-textSecondary text-center">{row.bangalore}</td>
                                <td className="px-8 py-6 text-sm font-medium text-textSecondary text-center">{row.goa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-6 text-xs text-textMuted italic text-center">
                *Prices are indicative of average private healthcare costs for international travelers.
            </p>
        </section>
      </main>
    </div>
  );
};

export default CostEstimator;

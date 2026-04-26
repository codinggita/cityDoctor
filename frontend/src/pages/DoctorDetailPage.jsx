import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { formatCurrency } from '../utils/helpers';

const DoctorDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="bg-blue-600 h-64 w-full"></div>
      
      <div className="max-w-4xl mx-auto px-4 -mt-32 pb-20">
        <div className="glass-card p-8 slide-up">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="w-40 h-40 bg-blue-100 rounded-3xl flex items-center justify-center text-6xl shadow-inner shrink-0">👨‍⚕️</div>
            <div className="grow">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Dr. Julian Smith</h1>
              <p className="text-xl text-blue-600 font-semibold mb-2">General Practitioner</p>
              <p className="text-slate-500 font-medium mb-6">🏥 St. Mary's International Hospital, Paris</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold border border-blue-100">English</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold border border-blue-100">French</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button className="btn-primary">Book Appointment</button>
              <button className="border-2 border-blue-600 text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors">Call Helpline</button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">About the Doctor</h3>
              <p className="text-slate-600 leading-relaxed">
                Dr. Smith has over 15 years of experience in family medicine. He specializes in treating visiting tourists and understands the unique health challenges of international travelers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Consultation Costs</h3>
              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                <div className="flex justify-between p-4 border-b border-white">
                  <span className="text-slate-600 font-medium">Initial Consultation</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(75)}</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-slate-600 font-medium">Follow-up Visit</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(45)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;

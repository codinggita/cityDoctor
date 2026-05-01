import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import CitySearchInput from '../components/CitySearchInput';
import DoctorCard from '../components/DoctorCard';
import { indianCities } from '../data/indianCities'; // Assuming this exists or CitySearchInput handles it
import { Link } from 'react-router-dom';

// Simple Tags Input Component
const TagsInput = ({ tags, setTags, placeholder }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full bg-slate-50 border border-slate-200 focus-within:border-[#2ECC71] focus-within:ring-[3px] focus-within:ring-[#2ECC71]/20 rounded-xl p-2 flex flex-wrap gap-2 transition-all duration-200">
      {tags.map((tag, index) => (
        <span key={index} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2 shadow-sm">
          {tag}
          <button type="button" onClick={() => removeTag(index)} className="text-slate-400 hover:text-red-500 font-bold">×</button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent outline-none py-1.5 px-2 text-slate-700 text-sm"
      />
    </div>
  );
};

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    languages: user?.preferredLanguage || ['English'],
    homeCity: user?.homeCity || '',
    hasInsurance: user?.hasInsurance || false,
    insuranceProvider: user?.insuranceProvider || '',
    emergencyName: user?.emergencyContact?.name || '',
    emergencyPhone: user?.emergencyContact?.phone || '',
    emergencyRelation: user?.emergencyContact?.relation || '',
    bloodGroup: user?.bloodGroup || '',
    allergies: user?.allergies || [],
    chronicConditions: user?.chronicConditions || [],
    medications: user?.medications || []
  });

  const languageOptions = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Kannada'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = (lang) => {
    const updated = formData.languages.includes(lang)
      ? formData.languages.filter(l => l !== lang)
      : [...formData.languages, lang];
    handleInputChange('languages', updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Update context
    updateProfile({
      name: formData.fullName,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      preferredLanguage: formData.languages,
      homeCity: formData.homeCity,
      hasInsurance: formData.hasInsurance,
      insuranceProvider: formData.insuranceProvider,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relation: formData.emergencyRelation
      },
      bloodGroup: formData.bloodGroup,
      allergies: formData.allergies,
      chronicConditions: formData.chronicConditions,
      medications: formData.medications
    });
    
    // Show Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current.click();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary object URL to display the image immediately
      const imageUrl = URL.createObjectURL(file);
      updateProfile({ avatar: imageUrl });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Mock Data for other tabs
  const mockBookings = [
    { id: 'B101', docName: 'Dr. Anita Sharma', specialty: 'General Physician', date: 'Oct 24, 2026', time: '10:30 AM', status: 'Upcoming' },
    { id: 'B102', docName: 'Dr. Rajeev Menon', specialty: 'Orthopedist', date: 'Oct 15, 2026', time: '04:00 PM', status: 'Completed' },
    { id: 'B103', docName: 'Dr. Sunita Patel', specialty: 'Dermatologist', date: 'Sep 28, 2026', time: '11:15 AM', status: 'Cancelled' },
  ];

  const mockSavedDoctors = [
    {
      id: 'd1',
      name: 'Dr. Anita Sharma',
      specialty: 'General Physician',
      hospital: 'Apollo Clinic',
      city: 'Mumbai',
      languages: ['English', 'Hindi', 'Marathi'],
      costRange: '500-800',
      rating: 4.8,
      reviewCount: 342,
      isVerified: true,
      experience: 12,
      available: true,
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      id: 'd2',
      name: 'Dr. Rajeev Menon',
      specialty: 'Orthopedist',
      hospital: 'Fortis Hospital',
      city: 'Mumbai',
      languages: ['English', 'Hindi', 'Malayalam'],
      costRange: '800-1200',
      rating: 4.9,
      reviewCount: 512,
      isVerified: true,
      experience: 18,
      available: true,
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200'
    }
  ];

  const navItems = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'bookings', label: 'My Bookings', icon: '📅' },
    { id: 'saved', label: 'Saved Doctors', icon: '❤️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-body pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Toast Notification */}
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-xl shadow-xl border border-[#2ECC71]/20 flex items-center gap-3 z-50 transition-all duration-300 ${showToast ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none'}`}>
          <div className="w-8 h-8 rounded-full bg-[#2ECC71]/20 text-[#1A6B3C] flex items-center justify-center text-xl">✅</div>
          <span className="font-bold text-slate-800">Profile updated successfully!</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* LEFT SIDEBAR (Desktop) / TOP CARD (Mobile) */}
          <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
            
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#1A6B3C]/10 to-transparent"></div>
              
              <div className="relative z-10 mb-4 group">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#1A6B3C] to-[#2ECC71] text-white font-bold flex items-center justify-center text-4xl shadow-lg shadow-[#2ECC71]/20 border-4 border-white overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                  )}
                </div>
                <button 
                  onClick={triggerPhotoUpload}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-white text-slate-600 rounded-full flex items-center justify-center shadow-md border border-slate-200 hover:text-[#1A6B3C] transition-colors"
                  title="Change Photo"
                >
                  📷
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {user?.name || 'Guest User'}
              </h2>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#1A6B3C]/10 text-[#1A6B3C] text-xs font-bold uppercase tracking-wider rounded-full border border-[#1A6B3C]/20">
                  {user?.userType || 'Traveler'}
                </span>
              </div>
              
              <p className="text-xs font-medium text-slate-500">Member since Oct 2026</p>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors border-b border-slate-100 last:border-0 text-left
                    ${activeTab === item.id 
                      ? 'bg-[#1A6B3C]/5 text-[#1A6B3C] border-l-4 border-l-[#1A6B3C]' 
                      : 'text-slate-600 hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div className="h-2 bg-slate-50"></div>
              <button
                onClick={logout}
                className="flex items-center gap-3 px-6 py-4 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors text-left"
              >
                <span className="text-lg">🚪</span>
                Logout
              </button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
              
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {navItems.find(i => i.id === activeTab)?.label || 'Profile'}
                </h3>
              </div>

              <div className="p-8">
                
                {/* --- TAB: PERSONAL INFO --- */}
                {activeTab === 'personal' && (
                  <form onSubmit={handleSave} className="space-y-10 animate-fade-in">
                    
                    {/* Section 1 - Basic Info */}
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">1</span>
                        Basic Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                          <input type="text" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                          <div className="relative">
                            <input type="email" value={formData.email} readOnly className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-500 outline-none cursor-not-allowed" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#2ECC71]/10 text-[#1A6B3C] text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">✓ Verified</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                          <input type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date of Birth</label>
                            <input type="date" value={formData.dob} onChange={e => handleInputChange('dob', e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
                            <select value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px] appearance-none">
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Section 2 - Travel Preferences */}
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">2</span>
                        Travel & Preferences
                      </h4>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Preferred Languages</label>
                          <div className="flex flex-wrap gap-2">
                            {languageOptions.map(lang => (
                              <button
                                type="button"
                                key={lang}
                                onClick={() => toggleLanguage(lang)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                                  ${formData.languages.includes(lang)
                                    ? 'bg-[#1A6B3C] text-white border-[#1A6B3C]'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                              >
                                {lang}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Home City</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🏙️</span>
                              <input 
                                type="text" 
                                value={formData.homeCity} 
                                onChange={e => handleInputChange('homeCity', e.target.value)} 
                                placeholder="Enter home city"
                                className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" 
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Travel Insurance</label>
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={formData.hasInsurance} onChange={() => handleInputChange('hasInsurance', true)} className="w-4 h-4 text-[#2ECC71] focus:ring-[#2ECC71] accent-[#2ECC71]" />
                                <span className="text-sm font-medium text-slate-700">Yes</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={!formData.hasInsurance} onChange={() => handleInputChange('hasInsurance', false)} className="w-4 h-4 text-[#2ECC71] focus:ring-[#2ECC71] accent-[#2ECC71]" />
                                <span className="text-sm font-medium text-slate-700">No</span>
                              </label>
                            </div>
                            
                            {formData.hasInsurance && (
                              <input 
                                type="text" 
                                value={formData.insuranceProvider} 
                                onChange={e => handleInputChange('insuranceProvider', e.target.value)}
                                placeholder="Provider Name (e.g. Allianz)"
                                className="w-full mt-3 bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-2 px-4 text-sm text-slate-700 outline-none transition-all duration-200" 
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Section 3 - Emergency Contact */}
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-sm">3</span>
                        Emergency Contact
                      </h4>
                      <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Name</label>
                          <input type="text" value={formData.emergencyName} onChange={e => handleInputChange('emergencyName', e.target.value)} className="w-full bg-white border border-slate-200 focus:border-red-400 focus:ring-red-400/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                          <input type="tel" value={formData.emergencyPhone} onChange={e => handleInputChange('emergencyPhone', e.target.value)} className="w-full bg-white border border-slate-200 focus:border-red-400 focus:ring-red-400/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Relationship</label>
                          <select value={formData.emergencyRelation} onChange={e => handleInputChange('emergencyRelation', e.target.value)} className="w-full bg-white border border-slate-200 focus:border-red-400 focus:ring-red-400/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px] appearance-none">
                            <option value="">Select...</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Parent">Parent</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Section 4 - Medical Info */}
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-sm">4</span>
                        Medical Info <span className="text-xs font-normal text-slate-400 ml-2">(Optional but recommended)</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Blood Group</label>
                          <select value={formData.bloodGroup} onChange={e => handleInputChange('bloodGroup', e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-[#2ECC71] focus:ring-[#2ECC71]/20 rounded-xl py-3 px-4 text-slate-700 outline-none transition-all duration-200 focus:ring-[3px] appearance-none">
                            <option value="">Select...</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Known Allergies</label>
                          <TagsInput tags={formData.allergies} setTags={(t) => handleInputChange('allergies', t)} placeholder="e.g. Penicillin, Peanuts (Press Enter)" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Chronic Conditions</label>
                          <TagsInput tags={formData.chronicConditions} setTags={(t) => handleInputChange('chronicConditions', t)} placeholder="e.g. Asthma, Diabetes (Press Enter)" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Medications</label>
                          <TagsInput tags={formData.medications} setTags={(t) => handleInputChange('medications', t)} placeholder="e.g. Inhaler (Press Enter)" />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 pb-2">
                      <button type="submit" className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#1A6B3C] to-[#2ECC71] text-white font-bold rounded-xl shadow-lg shadow-[#2ECC71]/20 hover:shadow-[#2ECC71]/40 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <span>💾</span> Save Changes
                      </button>
                    </div>

                  </form>
                )}

                {/* --- TAB: BOOKINGS --- */}
                {activeTab === 'bookings' && (
                  <div className="space-y-4 animate-fade-in">
                    {mockBookings.map((booking) => (
                      <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#2ECC71] transition-colors shadow-sm group">
                        <div className="flex gap-5 items-start">
                          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                            👨‍⚕️
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-lg text-slate-800">{booking.docName}</h4>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                                ${booking.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 
                                  booking.status === 'Completed' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-600'}`}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-[#1A6B3C] mb-2">{booking.specialty}</p>
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                              <span className="flex items-center gap-1">📅 {booking.date}</span>
                              <span className="flex items-center gap-1">⏰ {booking.time}</span>
                              <span className="flex items-center gap-1">📍 Booking ID: {booking.id}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex gap-3 md:flex-col lg:flex-row lg:items-center shrink-0">
                          {booking.status === 'Upcoming' && (
                            <button className="px-4 py-2 border-2 border-red-100 text-red-500 font-bold text-xs rounded-xl hover:bg-red-50 transition-colors">
                              Cancel
                            </button>
                          )}
                          <button className="px-6 py-2 bg-[#1A6B3C]/5 text-[#1A6B3C] font-bold text-xs rounded-xl hover:bg-[#1A6B3C] hover:text-white transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* --- TAB: SAVED DOCTORS --- */}
                {activeTab === 'saved' && (
                  <div className="animate-fade-in">
                    {mockSavedDoctors.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {mockSavedDoctors.map(doctor => (
                          <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                        <div className="text-6xl mb-4 opacity-50">💔</div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">No saved doctors yet</h4>
                        <p className="text-slate-500 mb-6">Keep track of your favorite doctors by saving their profiles.</p>
                        <Link to="/find-doctor" className="inline-block px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-[#2ECC71] hover:text-[#1A6B3C] transition-colors">
                          Start Exploring →
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* --- TAB: NOTIFICATIONS / SECURITY (Placeholders) --- */}
                {(activeTab === 'notifications' || activeTab === 'security') && (
                  <div className="text-center py-20 animate-fade-in">
                    <div className="text-5xl mb-4 opacity-30">{activeTab === 'notifications' ? '🔔' : '🔒'}</div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Coming Soon</h4>
                    <p className="text-slate-500">This feature is currently under development.</p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM TABS (Visible only on mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 px-2 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] overflow-x-auto hide-scrollbar">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-16 min-w-[64px] gap-1 transition-colors
              ${activeTab === item.id ? 'text-[#1A6B3C]' : 'text-slate-400'}`}
          >
            <span className={`text-xl ${activeTab === item.id ? 'transform scale-110' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
              {item.label.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default Profile;

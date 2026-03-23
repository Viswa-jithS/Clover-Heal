import { submitAssessment } from '../../api/api';
import React, { useState, useMemo } from 'react';
import { notifyAdmin } from '../../services/emailService';
import modelData from '../../data/modelData.json';

interface SymptomOption { label: string; key: string; }

interface FormData {
  personalInfo: { name: string; age: string; gender: string; phone: string; email: string; };
  symptoms: { selectedSymptoms: string[]; };
  clinicalContext: {
    exertion: boolean | null;
    chestSeverity: number;
    restBreathlessness: boolean | null;
    suddenOnset: boolean | null;
    fever: boolean | null;
    duration: string;
    knownConditions: string[];
    medications: string;
  };
  lifestyle: { smokingStatus: string; alcoholConsumption: string; additionalComments: string; };
}

const symptomOptions: SymptomOption[] = modelData.symptomOptions;

const DURATION_OPTIONS = [
  { value: '', label: 'Select Duration' },
  { value: 'less-than-24h', label: 'Less than 24 hours' },
  { value: '1-3-days', label: '1–3 days' },
  { value: '4-7-days', label: '4–7 days' },
  { value: '1-2-weeks', label: '1–2 weeks' },
  { value: '2-4-weeks', label: '2–4 weeks' },
  { value: 'more-than-month', label: 'More than a month' },
];

type Step = 1 | 2 | 3 | 4;

export const SymptomsAssessment = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [symptomSearch, setSymptomSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    personalInfo: { name: '', age: '', gender: '', phone: '', email: '' },
    symptoms: { selectedSymptoms: [] },
    clinicalContext: {
      exertion: null,
      chestSeverity: 0,
      restBreathlessness: null,
      suddenOnset: null,
      fever: null,
      duration: '',
      knownConditions: [],
      medications: '',
    },
    lifestyle: { smokingStatus: '', alcoholConsumption: '', additionalComments: '' },
  });

  const totalSteps: Step = 4;

  const filteredSymptoms = useMemo(() => {
    if (!symptomSearch.trim()) return symptomOptions;
    const q = symptomSearch.toLowerCase();
    return symptomOptions.filter(s => s.label.toLowerCase().includes(q));
  }, [symptomSearch]);

  const handlePersonalChange = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

  const handleClinicalChange = (field: string, value: string | number | boolean | null) =>
    setFormData(prev => ({ ...prev, clinicalContext: { ...prev.clinicalContext, [field]: value } }));

  const handleLifestyleChange = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, lifestyle: { ...prev.lifestyle, [field]: value } }));

  const toggleSymptom = (key: string) =>
    setFormData(prev => {
      const selected = prev.symptoms.selectedSymptoms;
      const updated = selected.includes(key)
        ? selected.filter(k => k !== key)
        : [...selected, key];
      return { ...prev, symptoms: { selectedSymptoms: updated } };
    });

  const goNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep < totalSteps) setCurrentStep(prev => (prev + 1) as Step);
  };
  const goPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep > 1) setCurrentStep(prev => (prev - 1) as Step);
  };

  const toggleKnownCondition = (condition: string) =>
    setFormData(prev => {
      const list = prev.clinicalContext.knownConditions;
      const updated = list.includes(condition)
        ? list.filter(c => c !== condition)
        : [...list, condition];
      return { ...prev, clinicalContext: { ...prev.clinicalContext, knownConditions: updated } };
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { selectedSymptoms } = formData.symptoms;
      const { exertion, chestSeverity, restBreathlessness, suddenOnset, fever, duration, knownConditions, medications } = formData.clinicalContext;
      const { smokingStatus, alcoholConsumption, additionalComments } = formData.lifestyle;

      const payload = {
        symptoms: selectedSymptoms,
        answers: {
          exertion: exertion ?? false,
          chest_severity: chestSeverity,
          rest_breathlessness: restBreathlessness ?? false,
          sudden_onset: suddenOnset ?? false,
          fever: fever ?? false,
          duration,
          known_conditions: knownConditions,
          medications,
          smokingStatus,
          alcoholConsumption,
        },
        personal_info: formData.personalInfo,
        additional_comments: additionalComments,
      };

      const response = await submitAssessment(payload);
      const emailPayload = {
        ...payload,
        admin_email: response.assigned_admin_email
      };
      await notifyAdmin(emailPayload);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Error submitting assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSet = new Set(formData.symptoms.selectedSymptoms);

  const inputClasses = "w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white shadow-sm hover:shadow-md";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2";

  const YesNoToggle = ({ label, value, fieldKey }: { label: string; value: boolean | null; fieldKey: string; }) => (
    <div className="mb-6 animate-in slide-in-from-bottom-4 duration-500">
      <label className={labelClasses}>{label}</label>
      <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner w-full sm:w-64 relative">
        <button type="button" 
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${value === true ? 'bg-white text-blue-600 shadow-md transform scale-105' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => handleClinicalChange(fieldKey, value === true ? null : true)}>Yes</button>
        <button type="button" 
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${value === false ? 'bg-white text-blue-600 shadow-md transform scale-105' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => handleClinicalChange(fieldKey, value === false ? null : false)}>No</button>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto p-4 flex items-center justify-center min-h-[60vh] animate-in fade-in duration-700">
        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-teal-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>
          <div className="w-24 h-24 bg-teal-100 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
            ✓
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Assessment Submitted!</h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Thank you, <strong className="text-slate-800">{formData.personalInfo.name || 'Patient'}</strong>. Your symptom assessment has been
            received and is now under review by our medical team.
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-blue-800">
            <p className="font-medium">
              📧 Your case result and diagnosis will be sent to <strong>{formData.personalInfo.email}</strong> once verified.
            </p>
          </div>
          <button className="px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-full font-semibold shadow-lg transition-all hover:-translate-y-1" onClick={() => { setSubmitted(false); setCurrentStep(1); }}>
            Submit Another Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Symptoms <span className="text-blue-600">Assessment</span>
        </h2>
        <p className="text-lg text-slate-600">Help us understand your condition better with this comprehensive assessment</p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden mb-12">
        {/* Progress Bar Container */}
        <div className="bg-slate-50 border-b border-slate-100 p-6 sm:px-10">
          <div className="flex justify-between text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
            <span>Progress</span>
            <span className="text-blue-600">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-teal-500 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}>
            </div>
          </div>
        </div>

        <form className="p-6 sm:p-10" onSubmit={handleSubmit}>

          {/* ───── Step 1: Personal Info ───── */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Full Name *</label>
                  <input type="text" className={inputClasses} value={formData.personalInfo.name}
                    onChange={e => handlePersonalChange('name', e.target.value)} required placeholder="John Doe" />
                </div>
                <div>
                  <label className={labelClasses}>Age *</label>
                  <input type="number" min="1" max="120" className={inputClasses} value={formData.personalInfo.age}
                    onChange={e => handlePersonalChange('age', e.target.value)} required placeholder="e.g. 35" />
                </div>
                <div>
                  <label className={labelClasses}>Gender *</label>
                  <select className={inputClasses} value={formData.personalInfo.gender}
                    onChange={e => handlePersonalChange('gender', e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Phone Number *</label>
                  <input type="tel" className={inputClasses} value={formData.personalInfo.phone}
                    onChange={e => handlePersonalChange('phone', e.target.value)} required placeholder="+1 (555) 000-0000" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Email Address *</label>
                  <input type="email" className={inputClasses} value={formData.personalInfo.email}
                    onChange={e => handlePersonalChange('email', e.target.value)} required placeholder="john.doe@example.com" />
                </div>
              </div>
            </div>
          )}

          {/* ───── Step 2: Symptom Search ───── */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                  Current Symptoms
                </h3>
                {selectedSet.size > 0 && <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">{selectedSet.size} selected</span>}
              </div>
              <p className="text-slate-600 mb-6">Search and select all symptoms you are currently experiencing.</p>
              
              <div className="relative mb-8 group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="text" className={`${inputClasses} pl-12 text-lg py-4`}
                  placeholder="Search symptoms (e.g. chest, fever)..."
                  value={symptomSearch} onChange={e => setSymptomSearch(e.target.value)} />
              </div>
              
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 max-h-[400px] overflow-y-auto shadow-inner">
                {filteredSymptoms.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No matching symptoms found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredSymptoms.map((symptom, idx) => {
                      const isSelected = selectedSet.has(symptom.key);
                      return (
                        <label key={symptom.key} 
                          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 animate-in fade-in zoom-in duration-300
                            ${isSelected ? 'bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-300' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'}`}
                          style={{ animationDelay: `${idx * 20}ms` }}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center mr-3 border transition-colors 
                            ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                            {isSelected && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <input type="checkbox" className="hidden" checked={isSelected}
                            onChange={() => toggleSymptom(symptom.key)} />
                          <span className={`${isSelected ? 'text-blue-900 font-medium' : 'text-slate-700'}`}>{symptom.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
              {selectedSet.size === 0 && (
                <p className="text-amber-600 text-sm mt-3 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                  Please select at least one symptom to continue.
                </p>
              )}
            </div>
          )}

          {/* ───── Step 3: Clinical Context ───── */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span>
                Clinical Details
              </h3>
              <p className="text-slate-600 mb-8 border-b pb-4 border-slate-100">These questions help our diagnostic model accurately assess your condition.</p>

              <YesNoToggle label="Do your symptoms worsen with physical exertion or activity?"
                value={formData.clinicalContext.exertion} fieldKey="exertion" />

              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 animate-in slide-in-from-bottom-4 duration-500 delay-100">
                <label className="block text-sm font-semibold text-slate-700 mb-4 flex justify-between items-center">
                  <span>Rate the intensity of any chest symptom (0-10)</span>
                  <span className="bg-white border text-blue-600 font-bold px-3 py-1 rounded-lg text-lg shadow-sm">
                    {formData.clinicalContext.chestSeverity}
                  </span>
                </label>
                <input type="range" min="0" max="10" step="1"
                  value={formData.clinicalContext.chestSeverity}
                  onChange={e => handleClinicalChange('chestSeverity', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="flex justify-between text-xs text-slate-500 font-medium mt-3 px-1">
                  <span>None (0)</span><span>Mild</span><span>Moderate</span><span>Severe</span><span>Extreme (10)</span>
                </div>
              </div>

              <YesNoToggle label="Do you have shortness of breath at rest (not just during activity)?"
                value={formData.clinicalContext.restBreathlessness} fieldKey="restBreathlessness" />

              <YesNoToggle label="Did the symptoms start suddenly (within minutes to hours)?"
                value={formData.clinicalContext.suddenOnset} fieldKey="suddenOnset" />

              <YesNoToggle label="Do you have a fever (temperature ≥ 38°C / 100.4°F)?"
                value={formData.clinicalContext.fever} fieldKey="fever" />

              <div className="mb-6 animate-in slide-in-from-bottom-4 duration-500">
                <label className={labelClasses}>Do you have any of these existing conditions? <span className="text-slate-400 font-normal">(Select all that apply)</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {["Diabetes", "Hypertension (High Blood Pressure)", "High Cholesterol", "Chronic Kidney Disease", "Asthma / COPD", "Heart Disease", "Cancer", "HIV / Immunodeficiency"].map(cond => {
                    const selected = formData.clinicalContext.knownConditions.includes(cond);
                    return (
                      <label key={cond} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                        selected ? 'bg-blue-50 border-blue-300 shadow-sm ring-1 ring-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'
                      }`}>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors flex-shrink-0 ${
                          selected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {selected && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={selected} onChange={() => toggleKnownCondition(cond)} />
                        <span className={`text-sm ${selected ? 'text-blue-900 font-medium' : 'text-slate-700'}`}>{cond}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="md:col-span-2">
                  <label className={labelClasses}>How long have you been experiencing these symptoms? *</label>
                  <select className={inputClasses} value={formData.clinicalContext.duration}
                    onChange={e => handleClinicalChange('duration', e.target.value)} required>
                    {DURATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Current medications or supplements:</label>
                  <textarea className={`${inputClasses} h-24 resize-none`} value={formData.clinicalContext.medications}
                    onChange={e => handleClinicalChange('medications', e.target.value)}
                    placeholder="e.g. Metformin 500mg, Aspirin..." />
                </div>
              </div>
            </div>
          )}

          {/* ───── Step 4: Lifestyle ───── */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
               <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">4</span>
                Lifestyle & Final Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className={labelClasses}>Smoking status:</label>
                  <select className={inputClasses} value={formData.lifestyle.smokingStatus}
                    onChange={e => handleLifestyleChange('smokingStatus', e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Alcohol consumption:</label>
                  <select className={inputClasses} value={formData.lifestyle.alcoholConsumption}
                    onChange={e => handleLifestyleChange('alcoholConsumption', e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClasses}>Any other details you'd like to mention:</label>
                <textarea className={`${inputClasses} h-32 resize-none`} value={formData.lifestyle.additionalComments}
                  onChange={e => handleLifestyleChange('additionalComments', e.target.value)}
                  placeholder="Describe any other symptoms or context that may be relevant to your condition..." />
              </div>
            </div>
          )}

          {/* ───── Navigation Actions ───── */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={goPrev}
                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 600, color: '#475569', background: 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                ← Previous
              </button>
            ) : <div></div>}
            
             {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={goNext}
                disabled={currentStep === 2 && selectedSet.size === 0}
                style={{
                  padding: '0.75rem 2rem',
                  background: currentStep === 2 && selectedSet.size === 0 ? '#94a3b8' : 'linear-gradient(to right, #2563eb, #14b8a6)',
                  color: '#ffffff',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: currentStep === 2 && selectedSet.size === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                  transition: 'all 0.3s ease',
                  opacity: currentStep === 2 && selectedSet.size === 0 ? 0.5 : 1,
                }}
                onMouseEnter={e => {
                  if (!(currentStep === 2 && selectedSet.size === 0))
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                Next Step →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '0.75rem 2rem',
                  background: isSubmitting ? '#5eead4' : 'linear-gradient(to right, #14b8a6, #0d9488)',
                  color: '#ffffff',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 16px rgba(20,184,166,0.4)',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: '1.25rem', height: '1.25rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Submitting...
                  </>
                ) : 'Submit Assessment ✓'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

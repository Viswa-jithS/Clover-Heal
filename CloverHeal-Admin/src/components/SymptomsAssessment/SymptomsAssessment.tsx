import React, { useState, useEffect } from 'react';
import modelData from '../../data/modelData.json';
import './SymptomsAssessment.css';

interface FormData {
  personalInfo: {
    name: string;
    age: string;
    gender: string;
    phone: string;
    email: string;
  };
  symptoms: {
    primarySymptom: string;
    duration: string;
    severity: string;
    additionalSymptoms: string[];
    painLocation: string;
    painScale: string;
    selectedDisease: string;
  };
  medicalHistory: {
    allergies: string;
    medications: string;
    conditions: string;
    recentTravel: string;
  };
  lifestyle: {
    smokingStatus: string;
    alcoholConsumption: string;
    exerciseFrequency: string;
    stressLevel: string;
  };
}

export const SymptomsAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: { name: '', age: '', gender: '', phone: '', email: '' },
    symptoms: { primarySymptom: '', duration: '', severity: '', additionalSymptoms: [], painLocation: '', painScale: '', selectedDisease: '' },
    medicalHistory: { allergies: '', medications: '', conditions: '', recentTravel: '' },
    lifestyle: { smokingStatus: '', alcoholConsumption: '', exerciseFrequency: '', stressLevel: '' }
  });

  const [dynamicSymptoms, setDynamicSymptoms] = useState<string[]>([]);
  const totalSteps = 4;

  useEffect(() => {
    if (formData.symptoms.selectedDisease) {
      const selected = modelData.symptoms[formData.symptoms.selectedDisease];
      setDynamicSymptoms(selected || []);
    } else {
      setDynamicSymptoms([]);
    }
  }, [formData.symptoms.selectedDisease]);

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleCheckboxChange = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        additionalSymptoms: prev.symptoms.additionalSymptoms.includes(symptom)
          ? prev.symptoms.additionalSymptoms.filter(s => s !== symptom)
          : [...prev.symptoms.additionalSymptoms, symptom]
      }
    }));
  };

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const submitSymptomsForPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: formData.symptoms.additionalSymptoms })
      });
      const result = await response.json();
      console.log("Prediction result:", result);
      alert(`Predicted Disease: ${result.FinalPrediction}`);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Failed to get prediction. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Assessment submitted:", formData);
    await submitSymptomsForPrediction();
    alert("Thank you! Our medical team will review your information.");
  };

  const commonSymptoms = [
    'Fever', 'Headache', 'Nausea', 'Vomiting', 'Dizziness', 'Fatigue',
    'Shortness of breath', 'Chest pain', 'Abdominal pain', 'Joint pain',
    'Muscle aches', 'Cough', 'Sore throat', 'Runny nose', 'Loss of appetite'
  ];

  return (
    <section className="symptoms-assessment section-padding" id="symptoms">
      <div className="container">
        <div className="assessment-header text-center mb-8">
          <h2>Symptoms Assessment</h2>
          <p>Help us understand your condition better with this comprehensive assessment</p>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
          <p className="step-indicator">Step {currentStep} of {totalSteps}</p>
        </div>

        <form className="assessment-form" onSubmit={handleSubmit}>
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="form-step">
              <h3>Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" value={formData.personalInfo.name} onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Age *</label>
                  <input type="number" value={formData.personalInfo.age} onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <select value={formData.personalInfo.gender} onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" value={formData.personalInfo.phone} onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} required />
                </div>
                <div className="form-group full-width">
                  <label>Email Address *</label>
                  <input type="email" value={formData.personalInfo.email} onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} required />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Symptoms */}
          {currentStep === 2 && (
            <div className="form-step">
              <h3>Current Symptoms</h3>
              <div className="form-group">
                <label>Select the disease or condition *</label>
                <select value={formData.symptoms.selectedDisease} onChange={(e) => handleInputChange('symptoms', 'selectedDisease', e.target.value)} required>
                  <option value="">Select Disease</option>
                  {modelData.diseases.map((disease: string) => (
                    <option key={disease} value={disease}>{disease}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Primary symptom *</label>
                <textarea value={formData.symptoms.primarySymptom} onChange={(e) => handleInputChange('symptoms', 'primarySymptom', e.target.value)} placeholder="Describe your main symptom..." required />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Duration *</label>
                  <select value={formData.symptoms.duration} onChange={(e) => handleInputChange('symptoms', 'duration', e.target.value)} required>
                    <option value="">Select Duration</option>
                    <option value="less-than-24h">Less than 24 hours</option>
                    <option value="1-3-days">1-3 days</option>
                    <option value="4-7-days">4-7 days</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="2-4-weeks">2-4 weeks</option>
                    <option value="more-than-month">More than a month</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Severity *</label>
                  <select value={formData.symptoms.severity} onChange={(e) => handleInputChange('symptoms', 'severity', e.target.value)} required>
                    <option value="">Select Severity</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                    <option value="very-severe">Very Severe</option>
                  </select>
                </div>
              </div>

              {/* Dynamic symptoms */}
              {dynamicSymptoms.length > 0 && (
                <div className="form-group">
                  <label>Symptoms commonly related to {formData.symptoms.selectedDisease}:</label>
                  <div className="symptoms-grid">
                    {dynamicSymptoms.map(symptom => (
                      <label key={symptom} className="checkbox-label">
                        <input type="checkbox" checked={formData.symptoms.additionalSymptoms.includes(symptom)} onChange={() => handleCheckboxChange(symptom)} />
                        <span>{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Common symptoms */}
              <div className="form-group">
                <label>Additional general symptoms:</label>
                <div className="symptoms-grid">
                  {commonSymptoms.map(symptom => (
                    <label key={symptom} className="checkbox-label">
                      <input type="checkbox" checked={formData.symptoms.additionalSymptoms.includes(symptom)} onChange={() => handleCheckboxChange(symptom)} />
                      <span>{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Medical History */}
          {currentStep === 3 && (
            <div className="form-step">
              <h3>Medical History</h3>
              <div className="form-group">
                <label>Allergies:</label>
                <textarea value={formData.medicalHistory.allergies} onChange={(e) => handleInputChange('medicalHistory', 'allergies', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Current medications or supplements:</label>
                <textarea value={formData.medicalHistory.medications} onChange={(e) => handleInputChange('medicalHistory', 'medications', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Existing medical conditions:</label>
                <textarea value={formData.medicalHistory.conditions} onChange={(e) => handleInputChange('medicalHistory', 'conditions', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Recent travel:</label>
                <select value={formData.medicalHistory.recentTravel} onChange={(e) => handleInputChange('medicalHistory', 'recentTravel', e.target.value)}>
                  <option value="">Select</option>
                  <option value="no">No recent travel</option>
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Lifestyle */}
          {currentStep === 4 && (
            <div className="form-step">
              <h3>Lifestyle Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Smoking status:</label>
                  <select value={formData.lifestyle.smokingStatus} onChange={(e) => handleInputChange('lifestyle', 'smokingStatus', e.target.value)}>
                    <option value="">Select</option>
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Alcohol consumption:</label>
                  <select value={formData.lifestyle.alcoholConsumption} onChange={(e) => handleInputChange('lifestyle', 'alcoholConsumption', e.target.value)}>
                    <option value="">Select</option>
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Exercise frequency:</label>
                  <select value={formData.lifestyle.exerciseFrequency} onChange={(e) => handleInputChange('lifestyle', 'exerciseFrequency', e.target.value)}>
                    <option value="">Select</option>
                    <option value="none">No regular exercise</option>
                    <option value="light">Light (1–2×/week)</option>
                    <option value="moderate">Moderate (3–4×/week)</option>
                    <option value="heavy">Heavy (5+×/week)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Stress level:</label>
                  <select value={formData.lifestyle.stressLevel} onChange={(e) => handleInputChange('lifestyle', 'stressLevel', e.target.value)}>
                    <option value="">Select</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="form-navigation">
            {currentStep > 1 && <button type="button" className="btn-secondary" onClick={prevStep}>Previous</button>}
            {currentStep < totalSteps ? (
              <button type="button" className="btn-primary" onClick={nextStep}>Next</button>
            ) : (
              <button type="submit" className="btn-primary">Submit Assessment</button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

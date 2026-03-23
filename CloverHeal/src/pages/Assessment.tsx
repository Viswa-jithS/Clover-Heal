import React from 'react';
import { Header } from '../components/Header/Header';
import { SymptomsAssessment } from '../components/SymptomsAssessment/SymptomsAssessment';
import { Footer } from '../components/Footer/Footer';

export const Assessment = () => {
  return (
    <>
      <Header />
      <div className="pt-24 pb-12 min-h-screen bg-slate-50">
        <SymptomsAssessment />
      </div>
      <Footer />
    </>
  );
};

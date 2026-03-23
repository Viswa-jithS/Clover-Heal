import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-24 pb-32" id="home">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 left-0 -m-32 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="hero-text flex-1 text-center md:text-left space-y-6 animate-in slide-in-from-bottom duration-700">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your Health, <br/>
              <span className="text-blue-600">Our Priority</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Experience compassionate healthcare with CloverHeal. Our dedicated team of 
              medical professionals is committed to providing you with the highest quality 
              care in a comfortable and welcoming environment.
            </p>
            <div className="hero-actions flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Link to="/assessment" className="btn-primary bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                Start Assessment <span className="text-xl">→</span>
              </Link>
              <a href="#services" className="btn-secondary bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 px-8 py-3.5 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-300">
                Our Services
              </a>
            </div>
          </div>
          
          <div className="hero-image flex-1 animate-in slide-in-from-right duration-700 delay-200 ease-out fill-mode-both w-full">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Main premium card floating */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-400 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-2xl flex flex-col items-center justify-center h-full text-center hover:scale-[1.02] transition-transform duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-teal-50 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner">
                  🏥
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">24/7 Emergency Care</h3>
                <p className="text-slate-600 leading-relaxed">Round-the-clock medical assistance powered by AI and expert personnel when you need it most.</p>
                <div className="mt-8 flex gap-2">
                  <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                  <div className="w-4 h-1.5 bg-teal-400 rounded-full"></div>
                  <div className="w-4 h-1.5 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

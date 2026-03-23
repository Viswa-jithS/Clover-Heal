import React from 'react';

export const About = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden" id="about">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            How <span className="text-teal-600">CloverHeal</span> Works
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full mx-auto mb-8"></div>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We intend to reduce and simplify the entire diagnosis process to a more fast, simple and effective experience using <span className="text-blue-600 font-semibold">advanced machine learning</span>. Our state-of-the-art facility combines cutting-edge technology with a patient-centered approach.
          </p>
        </div>

        {/* Workflow Steps - Horizontal on Desktop, Vertical on Mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 w-full z-20 relative">
          
          {/* Step 1 */}
          <div className="flex-1 w-full max-w-sm group animate-in zoom-in-95 fade-in duration-500 delay-100">
            <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden text-center h-full">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-blue-50 flex items-center justify-center border border-slate-100 group-hover:border-blue-300 transition-colors shadow-inner">
                 {/* Replaced with user's illustration or a placeholder */}
                 <img src="https://placehold.co/400x300/e0f2fe/0ea5e9?text=Patient+Entry&font=Montserrat" alt="Patient Symptom Entry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4 border-4 border-white shadow-sm -mt-12 relative z-10 group-hover:rotate-12 transition-transform">1</div>
              
              <h4 className="font-bold text-slate-800 text-xl mb-3">Patient Symptom Entry</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Input your current symptoms through our intuitive and secure dynamic assessment form.
              </p>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="hidden lg:flex flex-col items-center justify-center w-12 text-blue-400 animate-pulse animate-in fade-in duration-500 delay-200">
             <svg className="w-12 h-12 transform hover:scale-125 hover:text-blue-500 transition-all cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
             </svg>
          </div>
          
          {/* Down Arrow for Mobile */}
          <div className="lg:hidden flex justify-center w-full py-2 text-blue-400 animate-bounce">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
             </svg>
          </div>

          {/* Step 2 */}
          <div className="flex-1 w-full max-w-sm group animate-in zoom-in-95 fade-in duration-500 delay-300">
            <div className="bg-gradient-to-b from-white to-slate-50 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden text-center h-full">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-teal-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-[1500ms] ease-in-out pointer-events-none z-10"></div>
              
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-teal-50 flex items-center justify-center border border-slate-100 group-hover:border-teal-300 transition-colors shadow-inner z-20">
                 <img src="https://placehold.co/400x300/ccfbf1/14b8a6?text=ML+Processing&font=Montserrat" alt="ML Model Processing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4 border-4 border-white shadow-sm -mt-12 relative z-30 group-hover:rotate-12 transition-transform">2</div>
              
              <h4 className="font-bold text-teal-700 text-xl mb-3 relative z-20">ML Model Processing</h4>
              <p className="text-slate-600/90 text-sm leading-relaxed relative z-20">
                Our advanced artificial intelligence model securely processes your data to generate an output diagnosis.
              </p>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="hidden lg:flex flex-col items-center justify-center w-12 text-teal-400 animate-pulse animate-in fade-in duration-500 delay-400">
             <svg className="w-12 h-12 transform hover:scale-125 hover:text-teal-500 transition-all cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
             </svg>
          </div>
          
          {/* Down Arrow for Mobile */}
          <div className="lg:hidden flex justify-center w-full py-2 text-teal-400 animate-bounce">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
             </svg>
          </div>

          {/* Step 3 */}
          <div className="flex-1 w-full max-w-sm group animate-in zoom-in-95 fade-in duration-500 delay-500">
            <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden text-center h-full">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-indigo-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-indigo-50 flex items-center justify-center border border-slate-100 group-hover:border-indigo-300 transition-colors shadow-inner">
                 <img src="https://placehold.co/400x300/e0e7ff/6366f1?text=Doctor+Verification&font=Montserrat" alt="Doctor Verification" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4 border-4 border-white shadow-sm -mt-12 relative z-10 group-hover:rotate-12 transition-transform">3</div>
              
              <h4 className="font-bold text-slate-800 text-xl mb-3">Doctor Verification</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                A certified hospital doctor verifies or rejects the AI finding and provides expert comments based on diagnosis.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

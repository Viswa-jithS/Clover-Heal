import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1 space-y-6">
            <h3 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white text-sm">☘️</span>
              CloverHeal
            </h3>
            <p className="text-slate-400 leading-relaxed font-medium">
              Providing compassionate healthcare services to our community 
              with dedication, advanced AI, and excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-blue-500 hover:text-white transition-all duration-300 hover:-translate-y-1" aria-label="Facebook">📘</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 hover:-translate-y-1" aria-label="Twitter">🐦</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-pink-500 hover:text-white transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">📷</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Home</Link></li>
              <li><a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Services</a></li>
              <li><a href="/#about" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-xs">▶</span> About</a></li>
              <li><a href="/#contact" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Contact</a></li>
              <li><Link to="/assessment" className="text-teal-400 hover:text-teal-300 font-medium transition-colors flex items-center gap-2"><span className="text-xs">▶</span> AI Assessment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              <li><a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Immediate Care</a></li>
              <li><a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Disease Diagnosis</a></li>
              <li><a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Specialist Referrals</a></li>
              <li><a href="/#services" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Health Monitoring</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xl">📍</span>
                <p className="text-sm">123 Healthcare Avenue<br />Medical District, MD 12345</p>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xl">📞</span>
                <p className="text-sm font-medium">(555) 123-4567</p>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xl">✉️</span>
                <p className="text-sm text-blue-400 hover:underline cursor-pointer">info@cloverheal.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} CloverHeal. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { Services } from '../components/Services/Services';
import { About } from '../components/About/About';
import { Contact } from '../components/Contact/Contact';
import { Footer } from '../components/Footer/Footer';

export const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

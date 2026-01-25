import React from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';
import BuildSteadyDaily from '../components/BuildSteadyDaily';
import Features from '../components/Features';

const App = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BuildSteadyDaily />
      <Features />
    </main>
  );
}

export default App



import React from 'react';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-b from-indigo-50 to-white py-20 px-6 flex flex-col items-center justify-center text-center space-y-10">
      
      <div className="max-w-4xl px-4">
        <h1 className="text-heading font-heading font-extrabold md:text-6xl text-4xl leading-tight">
          Unlock Your <span className="text-primary">Potential</span> With
          <br />
          Curated Learning Paths
        </h1>

        <p className="text-muted text-lg mt-6">
          Learn from industry experts with flexible courses tailored to your goals — 
          whether you're upskilling, switching careers, or exploring new horizons.
        </p>

        <div className="w-full max-w-xl mt-8 mx-auto">
          <SearchBar />
        </div>

       
      </div>
    </div>
  );
};

export default Hero;

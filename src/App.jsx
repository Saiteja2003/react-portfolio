// src/App.jsx

import React, { useEffect, useState } from 'react'; // 1. Import useEffect
import { useLenis } from './hooks/useLenis'; // 2. Import Lenis

import Header from './components/header';
import { Suspense } from 'react';
import CustomCursor from './components/CustomCursor';
import Home from './components/Home';
import LazyComponent from './components/LazyComponent';
import SkeletonLoader from './components/SkeletonLoader';

const About = React.lazy(() => import('./components/about'));
const Projects = React.lazy(() => import('./components/Projects'));
const Footer = React.lazy(() => import('./components/footer'));

  
function App() {
  const lenis = useLenis(); // 2. Add state to hold the Lenis instance

  return (
    <>
      <CustomCursor />
      
      {/* 4. Pass the lenis instance down to the Header */}
      <Header lenis={lenis} />
      <Home lenis={lenis}/>
      <main>
        <Suspense fallback={<SkeletonLoader />}>
        <LazyComponent>
        <About />
        </LazyComponent>
        </Suspense>
         <Suspense fallback={<SkeletonLoader />}>
        <LazyComponent>
        <Projects />
       </LazyComponent>
       </Suspense>
      </main>
      <Suspense fallback={<div />}>
      <LazyComponent>
      <Footer lenis={lenis}  />
      </LazyComponent>
      </Suspense>
    </>
  );
}

export default App;
import React, { useEffect, useState } from 'react'
import ExpCard from '../component/expCard';

const Exp = () => {
  const [x, setX] = useState();
  const [y, setY] = useState();

  useEffect(() => {
    const update = (e) => {
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
    };
  }, [setX, setY]);

  return (
    <div className='text-zinc-300 w-full h-full flex flex-col justify-between gap-4 items-center relative overflow-y-auto overflow-x-hidden'>
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <h3 className="text-2xl text-zinc-100">experiences</h3>
        <div className='w-full h-full flex flex-col gap-8 px-8'>
          <ExpCard 
            title='Pushanmehr / Bist'
            desc='Designed and developed admin panels and store management dashboards. Created cross-platform mobile apps with React Native. Integrated RESTful APIs and optimized state management using Redux. Refined frontend workflows by modularizing codebases and automating deployment pipelines. Enhanced cross-browser compatibility by standardizing UI components.'
            img='news.jpg'
            skills={['React','React Native','Redux','Tailwind','CSS']}
            time={['March 2025','Now']}
            x={x} y={y}
            job='Frontend Developer'
          />
          <ExpCard 
            title='Amnafzar Gostar Sharif'
            desc='Developed and maintained large-scale dashboards and monitoring systems for semi-governmental projects. Implemented complex state management using React, Zustand, and TanStack. Refactored legacy codebase (30,000+ lines) achieving 50% build time reduction. Integrated E2E testing with Cypress/Playwright achieving 95% coverage and reducing bug reports by 60%. Integrated WebSocket architecture for real-time data synchronization.'
            img='news.jpg'
            skills={['React','Zustand','TanStack','MUI','Tailwind','Cypress','Playwright']}
            time={['September 2023','Now']}
            x={x} y={y}
            job='Frontend Developer'
          />
          <ExpCard 
            title='Food Food Co.'
            desc='Built interactive admin panel using React, Tailwind, and Three.js. Contributed to backend development with Laravel PHP. Designed UI/UX features for improved usability. Integrated RESTful APIs for real-time menu updates. Automated daily inventory workflows with Node.js. Refactored order management dashboard with Vue.js, reducing load times by 45%.'
            img='news.jpg'
            skills={['React','Vue.js','Three.js','Tailwind','Laravel','Node.js']}
            time={['January 2023','March 2023']}
            x={x} y={y}
            job='Fullstack Developer'
          />
        </div>
      </div>
    </div>
  )
}

export default Exp
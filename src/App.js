import React, { useRef, useEffect } from 'react';
import './App.css';
import { ReactComponent as Scene } from './scene.svg';
import { gsap, MotionPathPlugin } from 'gsap/all';

function App() {
  const wrapper = useRef(null);

  useEffect(() => {
    const [elements] = wrapper.current.children;
    const planet = elements.getElementById('planet');
    const stars = elements.getElementById('stars');
    const car = elements.getElementById('car');

    gsap.registerPlugin(MotionPathPlugin);

    gsap.set([planet, ...stars.children, car], { autoAlpha: 0 });

    const t1 = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    t1.to([planet, car], { duration: 2, autoAlpha: 1 })
      .to(stars.children, {
        duration: 1.5,
        autoAlpha: 1,
        stagger: 0.12
      })
      .to(car, {
        duration: 1,
        y: '+=20',
        x: '+=55',
        ease: 'Power1.easeIn'
      })
      .to(car, {
        duration: 1.2,
        scale: 0,
        motionPath: {
          path: '#CarPath',
          align: '#CarPath',
          autoRotate: 160,
          alignOrigin: [0.5, 0.5]
        }
      });
  }, []);

  return (
    <div ref={wrapper} className="App">
      <Scene />
    </div>
  );
}

export default App;

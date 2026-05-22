import { useEffect, useRef } from 'react';
import './magnetic-button.css';
import { cn } from "@/lib/utils";

export const MagneticButton = ({ className, label = "Reach Out" }: { className?: string, label?: string }) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fieldRef.current) return;
    const field = fieldRef.current;
    
    // Clear out any potential existing ones from React StrictMode double mount
    field.innerHTML = '';
    
    for (let i = 0; i < 25; i++) { // Reduced count for sleekness
      const particle = document.createElement('div');
      particle.className = 'magnetic-particle';
      
      const x = Math.random() * 80 - 40; // Tighter spread
      const y = Math.random() * 60 - 30; // Tighter spread
      
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      // Randomize animation duration for a natural look
      particle.style.animation = `particleFloat ${1.5 + Math.random() * 2}s infinite alternate ease-in-out`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      field.appendChild(particle);
    }
  }, []);

  return (
    <button className={cn("btn-magnetic", className)}>
      <span>{label}</span>
      <div className="particles-field" ref={fieldRef}></div>
    </button>
  );
};

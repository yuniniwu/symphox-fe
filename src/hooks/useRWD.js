import { useState, useEffect } from 'react';

export default function useRWD() {
  const [device, setDevice] = useState('mobile');

  const handleRWD = () => {
    if (window.innerWidth > 768) setDevice('PC');
    else if (window.innerWidth > 576) setDevice('tablet');
    else setDevice('mobile');
  };

  useEffect(() => {
    window.addEventListener('resize', handleRWD);
    handleRWD();
    return () => {
      window.removeEventListener('resize', handleRWD);
    };
  }, []);

  return device;
}

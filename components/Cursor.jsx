import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function AnimatedCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
    };

    const click = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 200);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', click);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', click);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x, y }}
    >
      {clicked && (
        <motion.div
          className="h-6 w-6 rounded-full border border-black"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  );
}

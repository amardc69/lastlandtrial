import React from 'react';
import { motion } from 'framer-motion';


export default function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  // Circular gradient with extra harmonious color stops
  const gradient =
    'linear-gradient(270deg, ' +
    '#E34F5A 0%, ' +    // deep coral
    '#FF6F61 10%, ' +   // bright coral
    '#D9A441 20%, ' +   // muted gold
    '#F6E27F 30%, ' +   // pale yellow
    '#3CA3A2 40%, ' +   // subdued teal
    '#16A085 50%, ' +   // deep turquoise
    '#72DDF7 60%, ' +   // electric blue
    '#6FA7D2 70%, ' +   // dusty sky blue
    '#8E44AD 80%, ' +   // rich purple
    '#E27FB4 90%, ' +   // soft pink
    '#E98582 100%' +   // rich rose
    ')';

  return (
    <motion.span
      className="inline-block font-schwager bg-clip-text text-transparent"
      style={{
        backgroundImage: gradient,
        backgroundSize: '400% 400%',
      }}
      animate={{
        // smoothly pan the gradient in a circular loop
        backgroundPosition: [
          '0% 50%',  // start left center
          '50% 100%',// bottom center
          '100% 50%',// right center
          '50% 0%',  // top center
          '0% 50%'  // back to start
        ],
      }}
      transition={{
        duration: 30,      // 30s for a balanced, fluid cycle
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      {children}
    </motion.span>
  );
}

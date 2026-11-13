import React from 'react';
import { motion } from 'framer-motion';

export default function FadeIn({ children, delay = 0, style, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MetricCounterProps {
  value: string;
  className?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({ value, className = '' }) => {
  // Extract number and suffix (e.g., "1000+" -> number: 1000, suffix: "+", "33.8 GWh/yr" -> 33.8, suffix: " GWh/yr")
  const match = value.match(/^([\d.,]+)(.*)$/);
  
  if (!match) {
    return <span className={className}>{value}</span>;
  }

  const rawNumStr = match[1].replace(/,/g, '');
  const targetNum = parseFloat(rawNumStr);
  const suffix = match[2];
  const isDecimal = rawNumStr.includes('.');
  const decimalPlaces = isDecimal ? rawNumStr.split('.')[1].length : 0;

  const spring = useSpring(0, {
    stiffness: 45,
    damping: 18,
    duration: 1.8,
  });

  const display = useTransform(spring, (current) => {
    return current.toFixed(decimalPlaces) + suffix;
  });

  const [renderedValue, setRenderedValue] = useState('0' + suffix);

  useEffect(() => {
    spring.set(targetNum);
    const unsubscribe = display.on('change', (latest) => {
      setRenderedValue(latest);
    });
    return () => unsubscribe();
  }, [targetNum, spring, display, suffix]);

  return <motion.span className={className}>{renderedValue}</motion.span>;
};

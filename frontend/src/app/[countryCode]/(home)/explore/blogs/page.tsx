"use client";

import React, { useEffect, useState } from 'react';
import styles from '../ComingSoon.module.css';

const ComingSoon: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-01-01T00:00:00');

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Coming Soon</h1>
        <p className={styles.subtitle}>The Great Blogs.</p>

        <div className={styles.countdown}>
          <div className={styles.timeBox}>
            <span className={styles.time}>{timeLeft.days}</span>
            <span className={styles.label}>Days</span>
          </div>
          <div className={styles.timeBox}>
            <span className={styles.time}>{timeLeft.hours}</span>
            <span className={styles.label}>Hours</span>
          </div>
          <div className={styles.timeBox}>
            <span className={styles.time}>{timeLeft.minutes}</span>
            <span className={styles.label}>Minutes</span>
          </div>
          <div className={styles.timeBox}>
            <span className={styles.time}>{timeLeft.seconds}</span>
            <span className={styles.label}>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

import { useEffect, useRef } from "react";
import styles from '../styles/SoundWave.module.scss';

const WaveAnimation: React.FC = () => {
  const soundWaveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (soundWaveRef.current) {
      const bars = soundWaveRef.current.querySelectorAll(`div.${styles.bar}`);

      bars.forEach((item) => {
        if (item instanceof HTMLElement) {
          item.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`;
        }
      });
    }
  }, []);

  const barsArr = Array.from({ length: 160 }, (_, i) => <div key={i} className={styles.bar} />);

  return <div ref={soundWaveRef} className={styles["sound-wave"]}>{barsArr}</div>;
};

export default WaveAnimation;


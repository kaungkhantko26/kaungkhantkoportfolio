import styles from "./Portfolio.module.css";
import Projects from "./Projects";
import Achievements from "./Achievements";
import { motion } from "framer-motion";

export default function Portfolio() {
  const titleAnimation = {
    initial: {
      opacity: 0,
      x: 160,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div>
        <motion.h2
          variants={titleAnimation}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.8 }}
          className={styles.title}
        >
          Portfolio
        </motion.h2>
      </div>
      <Projects />
      <Achievements />
    </section>
  );
}

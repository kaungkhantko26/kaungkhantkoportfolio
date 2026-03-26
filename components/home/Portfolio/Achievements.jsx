import styles from "./Achievements.module.css";
import { motion } from "framer-motion";

export default function Achievements() {
  const parentVariant = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };
  return (
    <div className={styles.achievements}>
      <h3 className={styles.title}>Achievements</h3>
      <motion.div
        variants={parentVariant}
        viewport={{ once: true }}
        whileInView="animate"
        initial="initial"
        className={styles.wrapper}
      >
        <motion.p variants={childVariant} className={styles.text}>
          Has done over <span className={styles.strong}>10+</span> projects
          including real-world projects, challenges and hackathon projects
        </motion.p>
        <motion.p
          variants={childVariant}
          className={`${styles.text} ${styles.leftText}`}
        >
          Work as <span className={styles.strong}>Student Ambssador</span> at{" "}
          <span className={styles.strong}>KBZPay</span>
        </motion.p>
      </motion.div>
    </div>
  );
}

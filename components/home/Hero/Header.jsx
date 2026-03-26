import styles from "./Header.module.css";
import { motion } from "framer-motion";

export default function Header() {
  const parentVariant = {
    animate: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const childVariant = {
    initial: {
      y: 20,
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.5
      },
    },
  };

  return (
    <motion.header className={styles.header} variants={parentVariant} animate="animate" initial="initial">
      <div className={styles.tags}>
        <motion.span variants={childVariant}>Kaung Khant Ko</motion.span>
      </div>
      <div className={styles.tags}>
        <motion.span variants={childVariant}>Yangon, Myanmar</motion.span>
      </div>
      <div className={styles.tags}>
        <motion.span variants={childVariant}>Computer Science Student</motion.span>
      </div>
    </motion.header>
  );
}

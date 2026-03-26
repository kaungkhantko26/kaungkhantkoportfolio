import styles from "./Skills.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { isStaticExport, withBasePath } from "../../../lib/basePath";

const skills = [
  { label: "Html" },
  { label: "Javascript", underline: true },
  { label: "Python" },
  { label: "Typescript", underline: true },
  { label: "Css" },
  { label: "Javascript", underline: true },
  { label: "Nextjs" },
];

export default function Skills() {
  const childVaraint = {
    initial: {
      opacity: 0,
      y: 10,
    },
  };

  const whileInView = {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      once: true,
    },
  };

  return (
    <section id="languages" className={styles.skills}>
      <motion.div className={styles.langs} initial="initial">
        {skills.map((skill) => (
          <motion.span
            key={`${skill.label}-${skill.underline ? "u" : "n"}`}
            variants={childVaraint}
            whileInView={whileInView}
            viewport={{ once: true }}
            className={`${styles.lang} ${
              skill.underline ? styles.underline : ""
            }`}
          >
            {skill.label}
          </motion.span>
        ))}
      </motion.div>

      <div className={styles.banner}>
        <Image
          src={withBasePath("/images/keyboard.png")}
          alt="keyboard background"
          width="1440"
          height="500"
          className={styles.image}
          loading="eager"
          priority={true}
          unoptimized={isStaticExport}
        />
        <h2 className={styles.text}>Innovative ideas through code</h2>
      </div>
    </section>
  );
}

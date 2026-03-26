import styles from "./About.module.css";
import { useDispatch } from "react-redux";
import { animationActions } from "../../../store/animationSlice";
import { useState, useRef } from "react";
import ArrowDown from "../../ui/ArrowDown";
import Image from "next/image";
import { motion } from "framer-motion";
import { isStaticExport, withBasePath } from "../../../lib/basePath";

export default function About() {
  const dispatch = useDispatch();
  const [pos, setPos] = useState(null);
  const buttonRef = useRef();

  function onMouseEnter(e) {
    dispatch(animationActions.hideCursor());
    const { pageX: x, pageY: y } = e;
    const { offsetLeft, offsetTop } = e.target;
    setPos({
      x: x - offsetLeft + "px",
      y: y - offsetTop + "px",
    });
  }

  const parentVariant = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariant = {
    initial: {
      opacity: 0,
    },
  };

  const whileInView = {
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  };

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
    <section id="about" className={styles.about}>
      <div>
        <motion.h2
          variants={titleAnimation}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.8 }}
          className={styles.title}
        >
          About
        </motion.h2>
      </div>
      <div className={styles.container}>
        <div
          className={styles.image}
          onMouseEnter={() => dispatch(animationActions.message())}
          onMouseLeave={() => dispatch(animationActions.removeState())}
        >
          <Image
            src={withBasePath("/images/profile.jpeg")}
            alt="Kaung Khant Ko"
            width="1400"
            height="1000"
            unoptimized={isStaticExport}
          />
        </div>
        <motion.div
          variants={parentVariant}
          initial="initial"
          className={styles.content}
        >
          <motion.h3
            whileInView={whileInView}
            viewport={{ once: true }}
            variants={childVariant}
            className={styles.name}
          >
            I&apos;m Kaung Khant Ko
          </motion.h3>
          <motion.p
            whileInView={whileInView}
            viewport={{ once: true }}
            variants={childVariant}
            className={styles.text}
          >
            Creative Junior <span className={styles.strong}>Graphic
            Designer</span> and student at{" "}
            <span className={styles.strong}>Auston College</span> with strong
            skills in visual design, branding, and programming. Experienced in
            social media, packaging, and poster design, with a strong interest
            in combining technology and design to create effective digital
            solutions. Brings a responsible and reliable work ethic, strong
            creative problem solving abilities, and effective team
            collaboration skills.
          </motion.p>
          <a
            className={styles.button}
            onMouseEnter={(e) => {
              onMouseEnter(e);
            }}
            onMouseLeave={() => {
              dispatch(animationActions.removeState());
              buttonRef.current?.classList.add(styles.out);
            }}
            href={withBasePath("/resume.pdf")}
            alt="cv downloader"
            download
          >
            Download CV <ArrowDown />
            {pos && (
              <span
                onTransitionEnd={() => setPos(null)}
                ref={buttonRef}
                style={{ transformOrigin: pos.x + " " + pos.y }}
                className={styles.button__overlay}
              />
            )}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

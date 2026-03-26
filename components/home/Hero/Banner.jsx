import styles from "./Banner.module.css";
import Link from "next/link";
import ArrowRight from "../../ui/ArrowRight";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { animationActions } from "../../../store/animationSlice";
import { motion } from "framer-motion";

export default function Banner() {
  const buttonOneRef = useRef();
  const buttonTwoRef = useRef();
  const spanOneRef = useRef();
  const spanTwoRef = useRef();
  const [pos, setPos] = useState(null);
  const dispatch = useDispatch();

  const parentVariant = {
    animate: {
      transition: {
        delayChildren: .2,
        staggerChildren: 0.1,
      },
    },
  };

  const fadeParentVariant = {
    animate: {
      transition: {
        delayChildren: .3,
        staggerChildren: 0.2,
      },
    },
  };

  const wordVariant = {
    initial: {
      y: 200,
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.65, 0.05, 0.36, 1],
      },
    },
  };

  const linkVariant = {
    initial: {
      y: 20,
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  const fadeVariant = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  function onMouseEnter(e, ref) {
    const { pageX, pageY } = e;
    const { offsetLeft, offsetTop } = ref.current;
    setPos({
      x: pageX - offsetLeft + "px",
      y: pageY - offsetTop + "px",
      ref: ref,
    });
    dispatch(animationActions.hideCursor());
  }

  function onMouseLeave(ref) {
    ref.current?.classList.add(styles.out);
    dispatch(animationActions.removeState());
  }

  function hideCursor() {
    dispatch(animationActions.hideCursor())
  }

  function showCursor() {
    dispatch(animationActions.removeState())
  }

  return (
    <section id="home" className={styles.banner}>
      <div className={styles.banner__top}>
        <motion.h1
          className={styles.title}
          variants={parentVariant}
          animate="animate"
          initial="initial"
        >
          <motion.div className={styles.title__first}>
            <motion.span
              variants={wordVariant}
              className={styles.titleMyanmar}
              lang="my"
            >
              မင်္ဂလာပါ
            </motion.span>
          </motion.div>
        </motion.h1>

        <div className={styles.blank}>
          <motion.nav
            className={styles.list}
            variants={parentVariant}
            animate="animate"
            initial="initial"
          >
            <ul>
              <li>
                <motion.a
                  variants={linkVariant}
                  href="#home"
                  alt="scroll to home"
                  tabIndex='1'
                  onMouseEnter={hideCursor}
                  onMouseLeave={showCursor}
                >
                  Home
                </motion.a>
              </li>
              <li>
                <motion.a
                  variants={linkVariant}
                  href="#portfolio"
                  alt="scroll to protfolio"
                  tabIndex='2'
                  onMouseEnter={hideCursor}
                  onMouseLeave={showCursor}
                >
                  Portfolio
                </motion.a>
              </li>
              <li>
                <motion.a
                  variants={linkVariant}
                  href="#about"
                  alt="scroll to about"
                  tabIndex='3'
                  onMouseEnter={hideCursor}
                  onMouseLeave={showCursor}
                >
                  About
                </motion.a>
              </li>
              <li>
                <motion.a
                  variants={linkVariant}
                  href="#contact"
                  alt="scroll to contact"
                  tabIndex='4'
                  onMouseEnter={hideCursor}
                  onMouseLeave={showCursor}
                >
                  Contact
                </motion.a>
              </li>
            </ul>
          </motion.nav>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        className={styles.work}
      >
        Available for work at{" "}
        <a href="mailto:kxant.edu06@gmail.com" alt="mail link" tabIndex='5'>
          kxant.edu06@gmail.com
        </a>
        .
      </motion.div>

      <div className={styles.banner__bottom}>
        <motion.p
          className={styles.strong}
          variants={parentVariant}
          animate="animate"
          initial="initial"
        >
          <span>
            <motion.span variants={linkVariant}>An individual with</motion.span>
          </span>{" "}
          <span>
            <motion.span variants={linkVariant}>
              passion for creative
            </motion.span>
          </span>{" "}
          <span>
            <motion.span variants={linkVariant}>development</motion.span>
          </span>
        </motion.p>
        <motion.div
          variants={fadeParentVariant}
          animate="animate"
          initial="initial"
          className={styles.banner__text}
        >
          <div className={styles.text__container}>
            <motion.p variants={fadeVariant} className={styles.text}>
              A creative developer focused on building thoughtful digital
              experiences through design, code, and problem solving.
            </motion.p>
            <motion.a
              variants={fadeVariant}
              className={styles.button}
              href="#portfolio"
              alt="portfolio section"
              onMouseEnter={(e) => onMouseEnter(e, buttonOneRef)}
              onMouseLeave={() => onMouseLeave(spanOneRef)}
              ref={buttonOneRef}
              tabIndex='6'
              >
              Go to Projects <ArrowRight />
              {pos && pos.ref === buttonOneRef && (
                <span
                  onTransitionEnd={() => setPos(null)}
                  ref={spanOneRef}
                  style={{ transformOrigin: pos.x + " " + pos.y }}
                  className={styles.button__overlay}
                />
              )}
            </motion.a>
          </div>
          <div className={styles.text__container}>
            <motion.p variants={fadeVariant} className={styles.text}>
              Fancy some web-related knowledge? Or simply just interested in my
              personal life? Check out my blog where I post all kinds of things.
            </motion.p>
            <Link href="/blog" alt="blog">
              <motion.a
                variants={fadeVariant}
                className={styles.button}
                onMouseEnter={(e) => onMouseEnter(e, buttonTwoRef)}
                onMouseLeave={() => onMouseLeave(spanTwoRef)}
                ref={buttonTwoRef}
                tabIndex='7'
              >
                Blog <ArrowRight />
                {pos && pos.ref === buttonTwoRef && (
                  <span
                    onTransitionEnd={() => setPos(null)}
                    ref={spanTwoRef}
                    style={{ transformOrigin: pos.x + " " + pos.y }}
                    className={styles.button__overlay}
                  />
                )}
              </motion.a>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

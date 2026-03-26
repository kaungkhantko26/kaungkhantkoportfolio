import styles from "./Contact.module.css";
import Image from "next/image";
import ArrowTopRight from "../../ui/ArrowTopRight";
import Social from "./Social";
import { isStaticExport, withBasePath } from "../../../lib/basePath";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.image}>
        <Image
          src={withBasePath("/images/letter.jpg")}
          alt="letter box"
          className={styles.image}
          height="800"
          width="700"
          unoptimized={isStaticExport}
        />
        <div className={styles.overlay} />
        <h2 className={styles.title}>
          Get in Touch <br />
          <ArrowTopRight />
          <Social />
        </h2>
      </div>
    </section>
  );
}

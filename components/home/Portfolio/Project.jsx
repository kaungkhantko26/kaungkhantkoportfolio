import styles from "./Project.module.css";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { animationActions } from "../../../store/animationSlice";
import { isStaticExport, withBasePath } from "../../../lib/basePath";

export default function Project({ project }) {
  const { slug, number, title, lang, href, imagePath, imageFit } = project;
  const dispatch = useDispatch();
  const imageSrc = withBasePath(imagePath || `/images/${slug}/banner.png`);
  const projectContent = (
    <>
      <div className={styles.number}>{number}</div>
      <Image
        className={styles.image}
        src={imageSrc}
        alt={title}
        width="800"
        height="100"
        objectFit={imageFit || "cover"}
        unoptimized={isStaticExport}
      />
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.lang}>{lang}</div>
        <div className={styles.desktop}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.number}>{number}</div>
          <div className={styles.lang}>{lang}</div>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={styles.project}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => dispatch(animationActions.project('Enter'))}
        onMouseLeave={() => dispatch(animationActions.removeState())}
      >
        {projectContent}
      </a>
    );
  }

  return (
    <Link href={"/projects/" + slug}>
      <a
        className={styles.project}
        onMouseEnter={() => dispatch(animationActions.project('Enter'))}
        onMouseLeave={() => dispatch(animationActions.removeState())}
      >
        {projectContent}
      </a>
    </Link>
  );
}

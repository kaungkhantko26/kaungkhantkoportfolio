import styles from "./ProjectItem.module.css";
import Image from "next/image";
import ArrowTopRight from "../ui/ArrowTopRight";
import BackButton from "../ui/BackButton";
import { useDispatch } from "react-redux";
import { animationActions } from "../../store/animationSlice";
import { isStaticExport, withBasePath } from "../../lib/basePath";

export default function Project({ project }) {
  const { title, slug, text1, text2, text3, text4, live, repo } = project;
  const dispatch = useDispatch();

  return (
    <div className={styles.project}>
      <div className={styles.banner}>
        <Image
          src={withBasePath(`/images/${slug}/banner.png`)}
          alt={title+" banner"}
          width="1200"
          height="600"
          objectFit="cover"
          unoptimized={isStaticExport}
        />
        <BackButton page='/' />
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.links}>
            <a
              onMouseEnter={() => dispatch(animationActions.hideCursor())}
              onMouseLeave={() => dispatch(animationActions.removeState())}
              className={styles.link}
              href={live}
              target="_blank"
              rel="noreferrer"
            >
              See it live <ArrowTopRight />
            </a>
            {repo && (
              <a
                onMouseEnter={() => dispatch(animationActions.hideCursor())}
                onMouseLeave={() => dispatch(animationActions.removeState())}
                className={styles.link}
                href={repo}
                target="_blank"
                rel="noreferrer"
              >
                Repo <ArrowTopRight />
              </a>
            )}
          </div>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.body}>
            <p>{text1}</p>

            <Image
              src={withBasePath(`/images/${slug}/preview.png`)}
              alt={title + ' preview'}
              width="900"
              height="450"
              layout="responsive"
              objectFit="cover"
              unoptimized={isStaticExport}
            />

            <p>{text2}</p>

            <Image
              src={withBasePath(`/images/${slug}/design.png`)}
              alt={title + ' design'}
              width="900"
              height="400"
              layout="responsive"
              objectFit="cover"
              unoptimized={isStaticExport}
            />

            <p>{text3}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from "./BlogItem.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { animationActions } from "../../store/animationSlice";
import { urlFor } from "../../sanity";
import Image from "next/image";
import { isStaticExport } from "../../lib/basePath";

export default function BlogItem({ blog }) {
  const { title, mainImage, overview, slug, timeToRead } = blog;
  const dispatch = useDispatch();
  const imageUrl = urlFor(mainImage)?.url();
  return (
    <div className={styles.wrapper}>
      <Link href={"/blog/" + slug.current} alt={title}>
        <a
          onMouseEnter={() =>
            dispatch(animationActions.project(timeToRead + "mins"))
          }
          onMouseLeave={() => dispatch(animationActions.removeState())}
          className={styles.blog}
        >
          <div className={styles.image}>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title}
                width="200"
                height="150"
                layout="responsive"
                priority={true}
                objectFit='cover'
                unoptimized={isStaticExport}
              />
            )}
          </div>
          <div className={styles.text}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.overview}>{overview}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

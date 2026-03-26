import styles from "./FeaturedItem.module.css";
import Link from "next/link";
import { urlFor } from "../../sanity";
import { animationActions } from "../../store/animationSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { isStaticExport } from "../../lib/basePath";

export default function FeaturedItem({ blog }) {
  const { title, timeToRead, mainImage, slug } = blog;
  const dispatch = useDispatch();
  const imageUrl = urlFor(mainImage)?.url();
  return (
    <div className={styles.wrapper}>
      <Link href={"/blog/" + slug.current}>
        <a
          onMouseEnter={() => dispatch(animationActions.image(mainImage))}
          onMouseLeave={() => dispatch(animationActions.removeState())}
          className={styles.featured}
        >
          {imageUrl && (
            <Image
              className={styles.image}
              src={imageUrl}
              priority={true}
              alt={title}
              layout="fill"
              objectFit="cover"
              unoptimized={isStaticExport}
            />
          )}
          <div className={styles.text}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.time}>{timeToRead}mins</div>
          </div>
        </a>
      </Link>
    </div>
  );
}

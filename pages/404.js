import styles from "../styles/404.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { isStaticExport, withBasePath } from "../lib/basePath";

export default function NotFoundPage() {
  const router = useRouter();
  function clickHandler() {
    router.back();
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1>404 | Page Not Found!</h1>
        <p>Whoa, whoa! You&apos;re on the wrong path. Turn around.</p>
        <button onClick={clickHandler} className={styles.home}>
          Go Back
        </button>
        <div className={styles.image}>
          <Image src={withBasePath("/images/bonk.png")} alt="404 error" layout="fill" objectFit="cover" unoptimized={isStaticExport} />
        </div>
      </div>
    </div>
  );
}

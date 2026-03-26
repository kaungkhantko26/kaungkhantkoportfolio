import BlogItem from "./BlogItem";
import styles from "./BlogList.module.css";

export default function BlogList({ blogs }) {
  return (
    <div className={styles.list}>
      <h2 className={styles.title}>All posts</h2>
      <div className={styles.wrapper}>
        {blogs.map((b) => (
          <BlogItem key={b._id} blog={b} />
        ))}
      </div>
    </div>
  );
}

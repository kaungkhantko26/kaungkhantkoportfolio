import styles from "./FeaturedBlogs.module.css";
import FeaturedItem from "./FeaturedItem";
import HomeButton from "../ui/HomeButton";

export default function FeaturedBlogs({ blogs }) {
  return (
    <div className={styles.featured}>
      <div className={styles.head}>
        <HomeButton />
      </div>
      <h1 className={styles.title}>Featured Posts</h1>
      <div className={styles.wrapper}>
        {blogs.slice(0,4).map((blog) => (
          <FeaturedItem key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

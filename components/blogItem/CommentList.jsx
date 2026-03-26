import styles from "./CommentList.module.css";
import client, { hasSanityConfig } from "../../sanity";
import { useEffect, useState } from "react";

export default function CommentList({ data, id }) {
  const [comments, setComments] = useState(data || [])
  useEffect(() => {
    if (!hasSanityConfig || !client) {
      return;
    }

    client.fetch(`*[_type=='post' && _id=='${id}']{'comments':*[_type=='comment'&&post._ref==^._id&&approved==true] | order(_createdAt desc)}`)
    .then(res => setComments(res[0].comments))
  }, [id])

  return (
    <ul className={styles.list}>
      {comments.map((comment) => {
        const date = new Date(comment._createdAt);
        return (
          <li className={styles.comment} key={Math.random()}>
            <p className={styles.message}>{comment.message}</p>
            <div className={styles.info}>
              <div className={styles.date}>
                {date.toLocaleString("en-GB", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).replace(new RegExp('/', 'g'), '-')}
              </div>
              <div className={styles.name}>-{comment.name}</div>
            </div>
          </li>
        );
      })}
      {comments.length === 0 && <li className={styles.empty}>No Comments</li>}
    </ul>
  );
}

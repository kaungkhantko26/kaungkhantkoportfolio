import styles from "./Comments.module.css";
import { useState, useRef } from "react";
import CommentList from "./CommentList";
import { useDispatch } from "react-redux";
import { animationActions } from '../../store/animationSlice';
import { withBasePath } from "../../lib/basePath";

export default function Comments({ comments, id }) {
  const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const wrapper = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  async function submitHandler(e) {
    e.preventDefault();
    if (name.trim().length === 0) {
      setError("Name can't be empty!");
      return;
    } else if (message.trim().length === 0) {
      setError("Message can't be empty!");
      return;
    }
    setError(null);
    setLoading(true);
    const res = await fetch(withBasePath("/api/post-comment"), {
      method: "POST",
      body: JSON.stringify({
        name: name.trim(),
        message,
        _id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading("false");

    if (!res.ok) {
      setError("Something went wrong");
      return;
    }

    setSuccess(true);
  }

  return (
    <div className={styles.comments}>
      <h2 className={styles.title}>Comments</h2>
      {isStaticExport && (
        <div className={styles.notice}>
          Comments are disabled on the static GitHub Pages deployment.
        </div>
      )}
      {success ? (
        <div className={styles.success}>
          <h3>Submitted!</h3>
          <p>Your comment will appear once it&apos;s been approved.</p>
        </div>
      ) : !isStaticExport ? (
        <form className={styles.form} onSubmit={submitHandler}>
          {error && <div className={styles.error}>{error}</div>}
          <label htmlFor="name">Comment as</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="off"
          />
          <div
            style={{ height: name ? wrapper.current.clientHeight : 0 }}
            className={styles.message}
          >
            <div ref={wrapper} className={styles.wrapper}>
              <label htmlFor="comment">Message</label>
              <br />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                placeholder="Enter your message"
                tabIndex={name ? 0 : -1}
              ></textarea>
              <br />
              <button
              onMouseEnter={() => dispatch(animationActions.hideCursor())}
              onMouseLeave={() => dispatch(animationActions.removeState())}
                tabIndex={name ? 0 : -1}
                className={`${styles.button} ${loading && styles.loading}`}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      ) : null}

      <CommentList data={comments} id={id} />
    </div>
  );
}

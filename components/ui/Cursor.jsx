import styles from "./Cursor.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { animationActions } from "../../store/animationSlice";
import { urlFor } from "../../sanity";
import Image from "next/image";
import { useRouter } from "next/router";
import { isStaticExport } from "../../lib/basePath";

export default function Cursor() {
  const [x, setX] = useState(-100);
  const [y, setY] = useState(-100);
  const state = useSelector((state) => state.state);
  const text = useSelector((state) => state.text);
  const index = useSelector((state) => state.index);
  const dispatch = useDispatch();
  const router = useRouter();
  const imageUrl = urlFor(text)?.url();

  const messages = [
    "Handsome? Me? Oh Thank you!",
    "Oh stop! You're making me blush",
    "Yeah Yeah, I get that a lot",
    "Why you keep hovering over me la?",
    "Again??",
    "I can do this all day 💪",
  ];

  function onMouseMove(event) {
    const { clientX: x, clientY: y } = event;
    setX(x);
    setY(y);
  }

  useEffect(() => {
    function routeChangeHandler() {
      dispatch(animationActions.resetIndex());
    }

    function onMouseEnter() {
      dispatch(animationActions.removeState());
    }

    function onMouseLeave() {
      dispatch(animationActions.hideCursor());
    }

    router.events.on("routeChangeStart", routeChangeHandler);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);

      router.events.off("routeChangeStart", routeChangeHandler);
    };
  }, [dispatch, router.events]);

  return (
    <div>
      <div
        style={{ top: y + "px", left: x + "px" }}
        className={`${styles.cursor} ${state === "hide" && styles.hidden} ${
          state === "expand" && styles.expand
        } ${state === "image" && imageUrl && styles.image} ${
          state === "message" && styles.message
        }`}
      >
        {state === "image" && imageUrl && (
          <Image
            src={imageUrl}
            alt="cursor image"
            width="200"
            height="100"
            objectFit="cover"
            layout="responsive"
            unoptimized={isStaticExport}
          />
        )}
        {state === "expand" && <span className={styles.text}>{text}</span>}
        {state === "message" && (
          <div className={styles.text}>{messages[index % messages.length]}</div>
        )}
      </div>
    </div>
  );
}

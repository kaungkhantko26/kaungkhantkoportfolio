import "../styles/globals.css";
import Cursor from "../components/ui/Cursor";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store";
import { AnimatePresence, motion } from "framer-motion";
import { usePageTransitionFix } from '../hooks/use-page-transition-fix'
import { useRouter } from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [isTouch, setIsTouch] = useState();
  const router = useRouter()
  usePageTransitionFix()

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  return (
    <Provider store={store}>
      <Head>
        <title>Kaung Khant Ko - Frontend Developer</title>
      </Head>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} exit={{opacity: 0}}>
          <Component {...pageProps} /></motion.div>
      </AnimatePresence>
      {!isTouch && <Cursor />}
    </Provider>
  );
}

export default MyApp;

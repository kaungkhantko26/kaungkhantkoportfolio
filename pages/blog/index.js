import FeaturedBlogs from "../../components/blogs/FeaturedBlogs";
import BlogList from "../../components/blogs/BlogList";
import client, { hasSanityConfig } from "../../sanity";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { animationActions } from "../../store/animationSlice";
import { motion } from "framer-motion";
import Head from "next/head";

export default function BlogsPage({ data }) {
  const dispatch = useDispatch();
  const blogs = data || [];

  useEffect(() => {
    return () => dispatch(animationActions.removeState());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Blog | Kaung Khant Ko</title>
        <meta
          name="description"
          content="Perfect place to read web-related knowledge or my personal life, experiences and stories."
        />
        <meta
          property="og:title"
          content="Blog | Kaung Khant Ko"
        />
        <meta
          property="og:description"
          content="Perfect place to read web-related knowledge or my personal life, experiences and stories."
        />
        {/* <meta property="og:image" content="" /> */}
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="blogs"
      >
        <FeaturedBlogs blogs={blogs.filter((b) => b.isFeatured)} />
        <BlogList blogs={blogs} />
      </motion.div>
    </>
  );
}

export async function getStaticProps() {
  if (!hasSanityConfig || !client) {
    return {
      props: {
        data: [],
      },
      revalidate: 3600,
    };
  }

  const data = await client.fetch(
    "*[_type=='post'] | order(publishedAt desc){title, _id, mainImage, overview, isFeatured, slug, timeToRead}"
  );
  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}

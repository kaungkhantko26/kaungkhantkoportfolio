import Blog from "../../components/blogItem/Blog";
import client, { hasSanityConfig, urlFor } from "../../sanity";
import { motion } from "framer-motion";
import Head from "next/head";

export default function BlogDetailPage({ blog }) {
  const post = blog?.[0];
  const imageUrl = urlFor(post?.mainImage)?.url();

  if (!post) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.overview} />
        <meta
          property="og:title"
          content={post.title}
        />
        <meta property="og:description" content={post.overview} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Blog blog={post} />
      </motion.div>
    </>
  );
}

export async function getStaticPaths() {
  if (!hasSanityConfig || !client) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const data = await client.fetch(`*[_type=='post']{slug}`);

  const paths = data.map((s) => {
    return { params: { slug: s.slug.current } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  if (!hasSanityConfig || !client) {
    return {
      notFound: true,
    };
  }

  const slug = context.params.slug;
  const data = await client.fetch(
    `*[_type=='post' && slug.current=='${slug}']{mainImage,overview,title,_id,body,publishedAt,'comments':*[_type=='comment'&&post._ref==^._id&&approved==true] | order(_createdAt desc)}`
  );

  if (!data || data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: data,
    },
    revalidate: 1800,
  };
}

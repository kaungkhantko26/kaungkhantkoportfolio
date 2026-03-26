import Project from "../../components/projects/ProjectItem";
import path from "path";
import { readFileSync } from "fs";
import Head from "next/head";
import { withBasePath } from "../../lib/basePath";

export default function ProjectPage({ project }) {
  return (
    <>
      <Head>
        <title>{project.title + ' | Kaung Khant Ko'}</title>
        <meta
          name="description"
          content={project.text1}
        />
        <meta property="og:title" content={project.title + ' | Kaung Khant Ko'} />
        <meta
          property="og:description"
          content={project.text1}
        />
        <meta property="og:image" content={withBasePath(`/images/${project.slug}/banner.png`)} />
      </Head>
      <Project project={project} />
    </>
  );
}

export async function getStaticProps(context) {
  const pathName = path.join(process.cwd(), "store", "projects.json");
  const data = JSON.parse(readFileSync(pathName, "utf8"));

  return {
    props: {
      project: data.find((p) => p.slug === context.params.slug),
    },
  };
}

export async function getStaticPaths() {
  const pathName = path.join(process.cwd(), "store", "projects.json");
  const data = JSON.parse(readFileSync(pathName, "utf8"));

  const paths = data.map((p) => ({
    params: { slug: p.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

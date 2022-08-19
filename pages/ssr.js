import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getPostsDataFromServer } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.heading2Xl}>I am generated server side</h1>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, data, name }) => (
            <li className={utilStyles.listItem} key={id}>
              {`id      : ` + id}
              <br />
              {`name   : ` + name}
              <br />
              {`date   : ` + date}
              <br />
              {`data    : ` + data}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await getPostsDataFromServer();

  return {
    props: {
      allPostsData: data,
    },
  };
}

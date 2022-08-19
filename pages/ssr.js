import utilStyles from "../styles/utils.module.css";
import { getPostsDataFromServer } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>I am generated server side</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function getServerSideProps(context) {
  const data = getPostsDataFromServer();
  return {
    props: {
      allPostsData: [data],
    },
  };
}

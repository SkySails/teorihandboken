import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import moment from "moment";
import styled from "styled-components";
import Link from "next/link";
import Header from "../src/components/Header";

export default function Home({ posts }) {
  return (
    <Container>
      <Head>
        <title>Startsida</title>
      </Head>
      <Header />
      <Content>
        <h1>Blogginlägg</h1>
        {posts.map(
          ({ metadata: { title, description, date, snippet, tags }, slug }) => (
            <Link href={`/post/[slug]`} as={`/post/${slug}`} key={title}>
              <article>
                <time>Posted {date}</time>
                <header>
                  <div>
                    <h2>{title}</h2>
                    <div className="tags">
                      {tags &&
                        tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </header>
                <p className="post-snippet">{snippet}</p>
              </article>
            </Link>
          )
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5em 1fr;
  grid-template-areas:
    "Header"
    "Content";
`;

const Content = styled.main`
  grid-area: Content;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr min(60ch, 100%) 1fr;
  grid-template-columns: 1fr min(60ch, 100%) 1fr;
  color: white;
  padding-top: 3rem;

  & > * {
    -ms-grid-column: 2;
    grid-column: 2;
    padding: 0 20px;
  }

  h1 {
  }

  h2 {
    font-weight: 600;
    font-size: 2em;
    margin: 0;
  }

  article {
    padding: 20px;
    border-radius: 10px;
    transition: background 0.2s;

    &:hover {
      cursor: pointer;
      background: #151d26;
      & h2 {
        color: #00ffc2;
      }
    }

    time {
      opacity: 0.3;
    }

    header {
      margin-top: 10px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .tags {
      display: flex;
      align-items: center;
      margin: -5px;
      margin-top: 5px;

      .tag {
        padding: 5px 10px;
        background: linear-gradient(90deg, #128cde 0%, #00ffc2 250%);
        border-radius: 20px;
        font-size: 0.7em;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px;
      }
    }

    .post-snippet {
      line-height: 1.4em;
      margin-bottom: 0;
    }
  }
`;

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/src/content`);

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`src/content/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetadata);

    const formattedDate = moment(data.date).format("MMMM M, YYYY");

    const metadata = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filename.replace(".md", ""),
      metadata,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

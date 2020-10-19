import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import moment from "moment";
import styled from "styled-components";
import Link from "next/link";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export default function Home({ posts }) {
  return (
    <Container>
      <Head>
        <title>Startsida | Fullstack Blog</title>
      </Head>
      <Header></Header>
      <Content className="transition-bg">
        <Hero>
          <img
            src="img/hero-logo.png"
            alt="A logotype with stacked layers (representing a stack), followed by the text 'Fullstack'"
          />
          <p>
            En samlingsplats för skrivelser, anteckningar, idéer och annat
            kulfrån elever som studerar till fullstack-utvecklare.
          </p>
        </Hero>
        <Posts>
          <h2>Blogginlägg</h2>
          <div className="blog-posts">
            {posts.map(
              ({
                metadata: { title, description, date, snippet, tags },
                slug,
              }) => (
                <Link href={`/post/[slug]`} as={`/post/${slug}`} key={title}>
                  <article>
                    <time>Posted {date}</time>
                    <header>
                      <div>
                        <h3>{title}</h3>
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
                    <p className="post-snippet">
                      {snippet.replace(/(([^\s]+\s\s*){25})(.*)/, "$1…")}
                    </p>
                  </article>
                </Link>
              )
            )}
          </div>
        </Posts>
      </Content>
      <Footer />
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
  padding: 0 2em;
  margin-bottom: 120px;
  background: var(--bg-primary);
  grid-area: Content;
  z-index: 1;
`;

const Hero = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 50vh;
  }

  p {
    width: 100vmin;
    font-size: 2em;
    text-align: center;
    color: var(--primary-color);
  }
`;

const Posts = styled.section`
  color: var(--bg-contrast);
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    -ms-grid-column: 2;
    grid-column: 2;
    padding: 0 20px;
  }

  h2 {
    font-weight: 600;
    font-size: 3em;
  }
  h3 {
    font-weight: 600;
    font-size: 2em;
    margin: 0;
  }

  .blog-posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    grid-gap: 15px 15px;
    margin-bottom: 2em;
  }

  article {
    padding: 20px;
    border-radius: 7px;
    transition: background 0.2s;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    transition: 0.2s;

    &:hover {
      cursor: pointer;
      backdrop-filter: brightness(140%);
      box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid transparent;

      & h2 {
        color: var(--primary-color);
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
        background: linear-gradient(
          90deg,
          #128cde 0%,
          var(--primary-color) 250%
        );
        border-radius: 20px;
        font-size: 0.7em;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px;
        color: white;
      }
    }

    .post-snippet {
      line-height: 1.4em;
      font-size: 1.4em;
      margin-bottom: 0;
      opacity: 0.8;
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

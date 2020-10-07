import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import moment from "moment";
import styled from "styled-components";
import Link from "next/link";
import Arrow from "../src/icons/Arrow";

export default function Home({ posts }) {
  return (
    <Container>
      {posts.map(
        ({
          frontmatter: { title, description, date, snippet, tags },
          slug,
        }) => (
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
              <section>
                <p>{snippet}</p>
              </section>
              <a>
                Läs mer <StyledArrow />
              </a>
            </article>
          </Link>
        )
      )}
    </Container>
  );
}

const Container = styled.main`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr min(60ch, 100%) 1fr;
  grid-template-columns: 1fr min(60ch, 100%) 1fr;
  color: white;
  padding-top: 2rem;

  article {
    margin: 20px 0;
    padding: 0 20px;

    &:hover {
      cursor: pointer;
      & h2 {
        color: #00ffc2;
      }
    }

    time {
      opacity: 0.3;
    }
  }

  .tags {
    display: flex;
    align-items: center;
    margin: -5px;
    margin-top: 5px;

    .tag {
      padding: 5px 10px;
      background: #128cde;
      border-radius: 20px;
      font-size: 0.7em;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px;
    }
  }

  & > * {
    -ms-grid-column: 2;
    grid-column: 2;
    padding: 0 20px;
  }

  h2 {
    font-weight: 600;
    font-size: 2em;
    margin: 0;
  }

  header {
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 1.1em;
  }
`;

const StyledArrow = styled(Arrow)`
  width: 25px;
  margin-left: -20px;
  opacity: 0;
  transition: 150ms;

  ${Container} article:hover & {
    margin-left: 10px;
    opacity: 1;
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

    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

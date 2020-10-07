import React, { useEffect, useState } from "react";
import matter from "gray-matter";
import Moment from "react-moment";
import PostLayout from "../../src/layout/PostLayout";
import Markdown from "../../src/parser/Markdown";
import Avatar from "../../src/components/Avatar";
import styled from "styled-components";
import Scrollspy from "react-scrollspy";
import HomeButton from "../../src/components/HomeButton";
import Fader from "../../src/components/Fader";

export default function PostTemplate({ content, data }) {
  const [headings, setHeadings] = useState(undefined);
  useEffect(() => {
    setHeadings(
      Array.from(document.querySelectorAll("h2")).filter(
        (h) => h.innerText !== "Innehåll"
      )
    );
    window.addEventListener("scroll", updateScrollProgress, false);

    function updateScrollProgress() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("bar").style.width = scrolled + "%";
    }
    return () =>
      window.removeEventListener(scroll, updateScrollProgress, false);
  }, []);

  return (
    <PostLayout>
      <ScrollProgress>
        <div id="bar" />
      </ScrollProgress>
      <Fader />
      <HomeButton />
      <Intro id="intro">
        <Moment format="MMMM M, YYYY">{data.date}</Moment>
        <h1 className="post-subject">{data.title}</h1>
        <Avatar name={data.author} src={data.author_img} />
      </Intro>

      {headings && (
        <ContentTable>
          <h2 style={{ marginBottom: 20 }}>Innehåll</h2>
          <Scrollspy
            items={headings.map((h) => h.id)}
            currentClassName="is-current"
          >
            {headings.map((h) => (
              <li
                key={h.id}
                className={parseInt(h.tagName.charAt(1)) === 2 && "heading"}
                style={{ marginLeft: parseInt(h.tagName.charAt(1)) * 10 }}
              >
                <a href={`#${h.id}`}>{h.innerText}</a>
              </li>
            ))}
          </Scrollspy>
        </ContentTable>
      )}
      <Markdown source={content} />
    </PostLayout>
  );
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;

  const content = await import(`../../src/content/${slug}.md`);
  const data = matter(content.default);

  return { ...data };
};

const Intro = styled.div`
  margin-bottom: 0em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContentTable = styled.div`
  grid-column: 1 !important;
  position: fixed;
  left: 20px;

  @media (max-width: 1110px) {
    display: none;
  }

  & > h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 10px 0;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -20px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: transparent;
        transition: 0.2s;
      }

      &.is-current {
        a {
          color: #00ffc2;
        }

        &:before {
          background: #00ffc2;
        }
      }
    }

    a {
      color: white;
      text-decoration: none;
      font-size: 1.2em;

      &:hover {
        color: #00ffc2;
      }
    }
  }
`;

const ScrollProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 4px;
  padding: 0 !important;
  z-index: 9999;

  #bar {
    height: 100%;
    background: #00ffc2;
    width: 0%;
  }
`;

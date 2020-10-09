import React, { useEffect, useState } from "react";
import matter from "gray-matter";
import PostLayout from "../../src/layout/PostLayout";
import Markdown from "../../src/parser/Markdown";
import HomeButton from "../../src/components/HomeButton";
import Fader from "../../src/components/Fader";
import ScrollProgress from "../../src/components/ScrollProgress";
import DynamicHead from "../../src/components/DynamicHead";
import PostIntro from "../../src/components/PostIntro";
import ContentTable from "../../src/components/ContentTable";

export default function PostTemplate({ content, data, slug }) {
  const [headings, setHeadings] = useState(undefined);

  // Parse page for headings and create an array with references
  useEffect(() => {
    setHeadings(
      Array.from(document.querySelectorAll("h2")).filter(
        (h) => h.innerText !== "Innehåll"
      )
    );
  }, []);

  return (
    <PostLayout>
      <DynamicHead data={data} slug={slug} />

      <ScrollProgress />
      <Fader />

      {headings && <ContentTable headings={headings} />}

      <PostIntro data={data} />
      <Markdown source={content} />
      <HomeButton />
    </PostLayout>
  );
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;

  const content = await import(`../../src/content/${slug}.md`);
  const data = matter(content.default);

  return { ...data, slug };
};

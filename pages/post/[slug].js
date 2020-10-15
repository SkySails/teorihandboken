import React from "react";
import matter from "gray-matter";
import PostLayout from "../../src/layout/PostLayout";
import Markdown from "../../src/parser/Markdown";
import HomeButton from "../../src/components/HomeButton";
import DynamicHead from "../../src/components/DynamicHead";
import PostIntro from "../../src/components/PostIntro";

export default function PostTemplate({ content, data, slug }) {
  return (
    <PostLayout slug={slug}>
      <DynamicHead data={data} slug={slug} />

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

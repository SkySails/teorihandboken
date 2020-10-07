import React from "react";
import matter from "gray-matter";
import Moment from "react-moment";
import PostLayout from "../../src/layout/PostLayout";
import Markdown from "../../src/parser/Markdown";
import Avatar from "../../src/components/Avatar";
import styled from "styled-components";

export default function PostTemplate({ content, data }) {
  return (
    <PostLayout>
      <Intro id="intro">
        <Moment format="MMMM M, YYYY">{data.date}</Moment>
        <h1 className="post-subject">{data.title}</h1>
        <Avatar name={data.author} src={data.author_img} />
      </Intro>
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

const Intro = styled.div``;

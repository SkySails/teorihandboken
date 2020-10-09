import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import Avatar from "./Avatar";
import HomeButton from "./HomeButton";

export default function PostIntro({ data }) {
  return (
    <IntroContainer id="post-header">
      <HomeButton tabIndex="1" />
      <Moment format="MMMM D, YYYY">{data.date}</Moment>
      <h1 className="post-subject">{data.title}</h1>
      <Avatar name={data.author} src={data.author_img} />
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  margin-bottom: 0em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

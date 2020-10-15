import React, { Fragment } from "react";
import styled from "styled-components";
import ContentTable from "../components/ContentTable";
import Header from "../components/Header";
import ScrollProgress from "../components/ScrollProgress";
import ScrollTop from "../components/ScrollTop";

export default function PostLayout({ children, slug }) {
  return (
    <PostContainer>
      <ScrollProgress />
      <Header />

      <ContentTable slug={slug} />
      <Post className="transition-color">{children}</Post>
      <ScrollTop />
    </PostContainer>
  );
}

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5em 1fr;
  grid-template-areas:
    "Header"
    "Content";
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  padding: 0 1.5em;
`;

const Post = styled.main`
  grid-area: content;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr min(75ch, 100%) 1fr;
  grid-template-columns: 1fr min(75ch, 100%) 1fr;
  color: var(--bg-contrast);

  padding: 3rem 0;
  position: relative;

  & > *:not(.full-bleed):not(#post-header) {
    -ms-grid-column: 2;
    grid-column: 2;
  }

  /* All headings within the post itself  */
  .content-header {
    margin-bottom: 0;
    padding-top: 8rem;
    margin-top: -6rem;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    /* &:not(h3):after {
      content: "";
      position: relative;
      display: relative;
      width: 100%;
      height: 2px;
      margin-left: 20px;
      background: var(--primary-color);
      opacity: 0.2;
    } */
  }

  /* Those shiny looking inline-links!  */
  .markdown-link {
    position: relative;
    text-decoration: none;
    color: var(--bg-contrast);
    -webkit-box-sizing: content-box;
    box-sizing: content-box;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #03e5a0;
      -webkit-transition: 350ms;
      transition: 350ms;
    }
    &:after {
      content: attr(data-title);
      -webkit-clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
      clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
      color: #03e5a0;
      display: inline-block;
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-transition: 350ms;
      transition: 350ms;
    }
    &:hover {
      color: transparent;
    }

    &:hover:after {
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }

    &:hover:before {
      -webkit-transform: translateY(-0.3em);
      transform: translateY(-0.3em);
      opacity: 0;
    }
  }

  /* Normal post text  */
  p {
    @extend .transition;
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    line-height: 1.6em;
    font-size: 1.2em;
    color: var(--bg-contrast);
    opacity: 0.9;
    transition: inherit;
  }

  /* Magical full-bleed image container  */
  .full-bleed {
    width: calc(100% + 2 * 1.5em);
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    grid-column: 1 / 4;
    margin: 20px 0;
    margin-left: -1.5em;

    img {
      max-height: 50vh;
      /* max-width: 1000px; */
      border-radius: 3px;
      display: block;
      width: 100%;
      margin: auto;
    }
  }

  /* code snippets  */
  pre {
    position: relative;
    overflow: visible !important;
    margin: 2rem 0 !important;

    &:before {
      content: attr(data-title);
      position: absolute;
      top: -1.8em;
      right: 10%;
      padding: 0 10px;
      padding-top: 0.3em;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      height: 1.8em;
      background: #282a36;
      font-weight: bold;
    }
  }

  .content-list {
    line-height: 1.8em;
    list-style: none;

    li {
      font-size: 1.2em;
      margin: 10px 0;
      position: relative;

      &:before {
        content: "• ";
        color: #03e5a0;
        position: absolute;
        font-size: 1.5em;
        left: -0.8em;
        top: -0.1em;
      }
    }
  }
`;

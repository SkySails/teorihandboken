import React from "react";
import styled from "styled-components";

export default function PostLayout({ children }) {
  return <PostContainer>{children}</PostContainer>;
}

const PostContainer = styled.main`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr min(75ch, 100%) 1fr;
  grid-template-columns: 1fr min(75ch, 100%) 1fr;
  color: white;
  padding: 5rem 0;
  position: relative;

  & > *:not(.full-bleed) {
    -ms-grid-column: 2;
    grid-column: 2;
    padding: 0 20px;
  }

  h1,
  h2,
  h3 {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin-top: 2em;
    margin-bottom: 0;
  }

  .post-subject {
    margin-top: 10px;
  }

  time {
    opacity: 0.5;
  }

  .markdown-link {
    position: relative;
    text-decoration: none;
    color: white;
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

  p {
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    line-height: 1.6em;
    font-size: 1.2em;
    color: #e5e5e5;
  }

  img:not(.profile) {
    max-height: 50vh;
    /* max-width: 1000px; */
    border-radius: 3px;
    display: block;
    width: 100%;
    margin: auto;
  }

  .full-bleed {
    width: 100%;
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    grid-column: 1 / 4;
    margin: 20px 0;
  }

  pre {
    position: relative;
    overflow: visible !important;
    margin: 2rem 0 !important;
  }

  pre:before {
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

  ul {
    margin: 0px 0 5px 40px;
    line-height: 1.8em;
    li {
      font-size: 1.2em;
      margin: 10px 0;
    }
  }
`;

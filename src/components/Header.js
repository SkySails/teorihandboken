import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Search from "./Search";

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <a>
          <h2 id="logo">Awesome Blog</h2>
        </a>
      </Link>
      <Search />
    </Container>
  );
}

const Container = styled.header`
  grid-area: Header;
  background: var(--bg-color);
  height: 5rem;
  padding: 0 2em;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  z-index: 998;

  &:after {
    content: "";
    height: 7vh;
    width: 100%;
    left: 0;
    position: absolute;
    bottom: 2px;
    transform: translateY(100%);
    background: linear-gradient(180deg, #0f151c 10%, #0f151c00 100%);
  }

  a {
    text-decoration: none;
    color: var(--bg-contrast);

    &:hover {
      text-decoration: underline;
    }
  }

  #search {
  }
`;

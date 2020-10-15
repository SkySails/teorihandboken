import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <a>
          <img src="/img/logo.png" />
        </a>
      </Link>
      <ThemeToggle />
      <Search />
    </Container>
  );
}

const Container = styled.header`
  grid-area: Header;
  background: var(--bg-primary);
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

  a {
    height: 70%;
    img {
      height: 100%;
    }
  }

  &:after {
    content: "";
    height: 7vh;
    width: 100%;
    left: 0;
    position: absolute;
    bottom: 2px;
    transform: translateY(100%);
    background: linear-gradient(
      180deg,
      var(--bg-primary) 10%,
      var(--bg-transparent) 100%
    );
  }
`;

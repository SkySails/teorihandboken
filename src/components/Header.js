import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <Container className="transition-bg">
      <Link href="/">
        <a>
          <img src="/img/logo.png" />
        </a>
      </Link>
      <ThemeToggle />
      <Search />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="gradient"
        width="100%"
        height="100%"
        className="transition-svg"
        preserveAspectRatio="none"
        viewBox="0 0 600 70"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="var(--bg-primary)" />
            <stop offset="1" stopOpacity="0" stopColor="var(--bg-primary)" />
          </linearGradient>
        </defs>
        <rect
          id="Rectangle_213"
          data-name="Rectangle 213"
          width="600"
          height="70"
          fill="url(#linear-gradient)"
        />
      </svg>
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

  #gradient {
    position: absolute;
    height: 7vh;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 2px;
    transform: translateY(100%);
  }
`;

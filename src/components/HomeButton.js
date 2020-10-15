import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Arrow from "../icons/Arrow";

export default function HomeButton() {
  return (
    <Link href="/">
      <StyledAnchor tabIndex="0">
        <StyledArrow /> Tillbaka till startsidan
      </StyledAnchor>
    </Link>
  );
}

const StyledArrow = styled(Arrow)`
  width: 30px;
  margin-right: 10px;
  transition: 150ms;
  transform: rotate(180deg);
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: var(--bg-contrast);
  font-size: 1.2em;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  border: 2px solid var(--primary-color);
  padding: 15px;
  border-radius: 5px;

  &:hover {
    color: var(--primary-color);
  }

  &:focus {
    box-shadow: 0 0 0 4px var(--primary-color);
  }
`;

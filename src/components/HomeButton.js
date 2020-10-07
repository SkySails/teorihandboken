import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Arrow from "../icons/Arrow";

export default function HomeButton() {
  return (
    <Link href="/">
      <StyledAnchor>
        <StyledArrow /> Tillbaka till startsidan
      </StyledAnchor>
    </Link>
  );
}

const StyledArrow = styled(Arrow)`
  width: 25px;
  margin-right: 10px;
  transition: 150ms;
  transform: rotate(180deg);
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: white;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    color: #00ffc2;
  }
`;

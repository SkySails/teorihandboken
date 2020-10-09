import React, { useEffect, useState } from "react";
import Scrollspy from "react-scrollspy";
import styled from "styled-components";
import ContentTableIcon from "../icons/ContentTable";

export default function ContentTable({ headings }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1200) setIsOpen(true);
  }, []);

  return (
    <Container isOpen={isOpen}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <ContentTableIcon color="var(--bg-color)" />
      </ToggleButton>

      <Scrollspy
        items={headings.map((h) => h.id)}
        currentClassName="is-current"
      >
        <h2 style={{ marginBottom: 20 }}>Innehåll</h2>
        {headings.map((h) => (
          <li
            key={h.id}
            className={parseInt(h.tagName.charAt(1)) === 2 && "heading"}
            style={{ marginLeft: (parseInt(h.tagName.charAt(1)) - 2) * 10 }}
          >
            <a href={`#${h.id}`}>{h.innerText}</a>
          </li>
        ))}
      </Scrollspy>
    </Container>
  );
}

const ToggleButton = styled.button`
  background: var(--primary-color);
  border-left: 2px solid var(--bg-color);
  position: absolute;
  top: 10px;
  right: -2px;
  transform: translateX(100%);
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 40px;
  width: 45px;
  padding-right: 10px;
  z-index: -1;
  cursor: pointer;
  outline: none;
`;

const Container = styled.div`
  grid-column: 1 !important;
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%) ${(props) => !props.isOpen && "translateX(-100%)"};
  transition: transform 350ms;
  background: var(--bg-color);

  /* @media (max-width: 1250px) {
    display: none;
  } */

  h2 {
    margin-top: 0;
    font-size: 1.8em;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 20px 15px !important;
    padding-left: 15px;
    border: 3px solid #00ffc2;
    border-left: none;
    background: #0f151c;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    li {
      margin: 15px 0;
      position: relative;

      &.is-current {
        a {
          color: #00ffc2;
        }
      }
    }

    a {
      color: white;
      text-decoration: none;
      font-size: 1.1em;

      &:hover {
        color: #00ffc2;
      }
    }
  }
`;

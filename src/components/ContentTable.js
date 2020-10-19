import React, { useEffect, useState } from "react";
import Scrollspy from "react-scrollspy";
import styled from "styled-components";
import ContentTableIcon from "../icons/ContentTable";

export default function ContentTable({ slug }) {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState(undefined);

  // Parse page for headings and create an array with references
  useEffect(() => {
    setHeadings(
      Array.from(document.querySelector("main").querySelectorAll("h2"))
    );
  }, [slug]);

  useEffect(() => {
    window.innerWidth > 1200 ? setIsOpen(true) : setIsOpen(false);
  }, []);

  return (
    <Container isOpen={isOpen}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <ContentTableIcon color="var(--bg-primary)" />
      </ToggleButton>

      {headings && (
        <Scrollspy
          items={headings.map((h) => h.id)}
          currentClassName="is-current"
          offset={-200}
          className="transition-bg"
        >
          <h2 className="transition-color" style={{ marginBottom: 20 }}>
            Innehåll
          </h2>
          {headings.map((h) => (
            <li
              key={h.id}
              className={
                parseInt(h.tagName.charAt(1)) === 2 &&
                "heading transition-color"
              }
              style={{ marginLeft: (parseInt(h.tagName.charAt(1)) - 2) * 10 }}
            >
              <a href={`#${h.id}`}>{h.innerText}</a>
            </li>
          ))}
        </Scrollspy>
      )}
    </Container>
  );
}

const ToggleButton = styled.button`
  background: var(--primary-color);
  position: absolute;
  top: 10px;
  right: 0;
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
  z-index: 999;
  color: var(--bg-contrast);

  /* @media (max-width: 1250px) {
    display: none;
  } */

  h2 {
    margin-top: 0;
    font-size: 1.8em;
    color: inherit;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 20px 15px !important;
    padding-left: 15px;
    border: 3px solid var(--primary-color);
    border-left: none;
    background: var(--bg-primary);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;

    li {
      margin: 15px 0;
      position: relative;

      &.is-current {
        a {
          color: var(--primary-color);
        }
      }
    }

    a {
      color: inherit;
      text-decoration: none;
      font-size: 1.1em;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

import React, { useEffect } from "react";
import styled from "styled-components";

export default function ScrollProgress() {
  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress, false);

    function updateScrollProgress() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("bar").style.width = scrolled + "%";
    }
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);
  return (
    <Container>
      <div id="bar" />
    </Container>
  );
}

const Container = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  padding: 0 !important;
  z-index: 9999;

  #bar {
    height: 100%;
    background: var(--primary-color);
    width: 0%;
  }
`;

import React from "react";
import styled from "styled-components";

export default function ScrollTop() {
  const scrollToTop = () => {
    console.log("Scrolling");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <Container onClick={scrollToTop}>👆🏾</Container>;
}

const Container = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 0px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
  z-index: 999;

  &:active {
    transform: scale(0.95);
  }
`;

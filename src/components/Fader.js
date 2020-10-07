import React from "react";
import styled from "styled-components";

export default function Fader() {
  return <FadeContainer></FadeContainer>;
}

const FadeContainer = styled.div`
  height: 10%;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #0f151c 10%, transparent 100%);
`;

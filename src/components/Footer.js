import React from "react";
import styled from "styled-components";
import { useColorScheme } from "../context/ThemeContext";

export default function Footer() {
  const { colorScheme } = useColorScheme();
  return <Container>&#169; Malte Hallström</Container>;
}

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 0;
  color: var(--bg-contrast);
  display: flex;
  align-items: center;
  justify-content: center;
`;

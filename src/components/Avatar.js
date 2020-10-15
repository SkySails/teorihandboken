import React, { Fragment } from "react";
import styled from "styled-components";

export default function Avatar({ name, src }) {
  return (
    <Container>
      <section>
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="gradient" x1="1" x2="0" y1="1" y2="0">
              <stop offset="0%" stopColor="#128CDE"></stop>
              <stop offset="100%" stopColor="var(--primary-color)"></stop>
            </linearGradient>
          </defs>
        </svg>
        <Picture src={src} alt="A profile picture" className="profile" />
        <svg id="half-circle" viewBox="0 0 106 57">
          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
        </svg>
      </section>
      <section className="data">
        <div>
          <span>Author</span>
          <span className="author-name">{name}</span>
        </div>
      </section>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 20px 0 #00000025;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 15px;
  transition: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 30px 0 #00000025;
  }

  section {
    position: relative;
  }

  .data > div {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    span:nth-child(1) {
      font-weight: bold;
      opacity: 0.4;
    }

    span:nth-child(2) {
      margin-top: 5px;
      font-size: 1.3em;
    }
  }

  #half-circle {
    position: absolute;
    bottom: -10px;
    left: -5px;
    width: 75px;
    height: 51px;
    fill: none;
    stroke: url(#gradient);
    stroke-width: 8;
    stroke-linecap: round;
    pointer-events: none;
  }
`;

const Picture = styled.img`
  border-radius: 50%;
  width: 55px;
  height: 55px !important;
  display: block;
  overflow: hidden;
  margin: -5px 10px 5px 5px;
`;

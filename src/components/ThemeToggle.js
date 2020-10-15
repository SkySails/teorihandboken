import React from "react";
import styled from "styled-components";
import { useColorScheme } from "../context/ThemeContext";

export const ThemeToggle = ({ className }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  if (!colorScheme) {
    return null;
  }

  return (
    <ThemeToggleContainer
      onClick={toggleColorScheme}
      className={`${className} ${colorScheme}`.trim()}
    >
      <svg
        className="moon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-6 -6 12 12"
      >
        <defs>
          <mask id="earth">
            <rect fill="white" x="-5" y="-5" width="10" height="10"></rect>
            <circle
              className="moon-circle"
              fill="black"
              cx="3.141592654"
              r="5"
            />
          </mask>
        </defs>
        <circle
          r="5"
          fill="currentColor"
          mask="url(#earth)"
          transform="rotate(-50.5)"
        />
      </svg>
      <div className="ray one"></div>
      <div className="ray two"></div>
      <div className="ray three"></div>
      <div className="ray four"></div>
      <div className="ray five"></div>
      <div className="ray six"></div>
      <div className="ray seven"></div>
      <div className="ray eight"></div>
    </ThemeToggleContainer>
  );
};

export default ThemeToggle;

const ThemeToggleContainer = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.25;
  margin-left: auto;
  margin-right: 10px;
  cursor: pointer;
  .moon {
    width: 30px;
    z-index: 99;
    color: #000;
    .moon-circle {
      transition: transform 0.2s;
    }
    transition: width 0.2s;
  }
  &.dark {
    .moon {
      width: 20px;
      color: #fff;
    }
    .moon-circle {
      transform: translate(10px);
    }
  }
  &:hover {
    opacity: 1;
  }
  div {
    position: absolute;
    background: #f5f5f5;
    transition: transform 0.2s, background 0.2s, opacity 0.2s;
  }
  .ray {
    width: 6px;
    height: 2px;
    border-radius: 2px;
  }
  .ray.one {
    transform: rotate(0deg) translateX(14px);
  }
  .ray.two {
    transform: rotate(45deg) translateX(14px);
  }
  .ray.three {
    transform: rotate(90deg) translateX(14px);
  }
  .ray.four {
    transform: rotate(135deg) translateX(14px);
  }
  .ray.five {
    transform: rotate(180deg) translateX(14px);
  }
  .ray.six {
    transform: rotate(225deg) translateX(14px);
  }
  .ray.seven {
    transform: rotate(270deg) translateX(14px);
  }
  .ray.eight {
    transform: rotate(315deg) translateX(14px);
  }
  &.light .ray {
    transform: scaleX(0.01);
    opacity: 0;
  }
`;

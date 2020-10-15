import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const Router = useRouter();

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((result) => {
          setResults(result);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event, bypass) => {
    if (
      (searchRef.current && !searchRef.current.contains(event.target)) ||
      bypass
    ) {
      setActive(false);
      window.removeEventListener("click", onClick);
      if (bypass) setQuery("");
    }
  }, []);

  return (
    <SearchContainer ref={searchRef} id="search">
      <input
        onChange={onChange}
        onFocus={onFocus}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            Router.push("/post/[slug]", `/post/${results[0].slug}`);
            setQuery("");
            searchRef.current.querySelector("input").blur();
            setActive(false);
            window.removeEventListener("click", onClick);
          }
        }}
        placeholder={"Sök inlägg"}
        type="search"
        value={query}
      />
      {active && results.length > 0 && (
        <ul>
          {results.map(({ slug, title, description }) => {
            return (
              <Result key={slug} onClick={(e) => onClick(e, true)}>
                <Link href="/post/[slug]" as={`/post/${slug}`} passHref>
                  <a>
                    <h3>{title}</h3>
                    <span>{description}</span>
                  </a>
                </Link>
              </Result>
            );
          })}
        </ul>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
  background: var(--bg-color);
  z-index: 9999;

  input {
    max-width: 300px;
    padding: 7px 10px;
    font-size: 1.3em;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -webkit-appearance: none;
    color: white;
    width: 100%;
    outline: none;
    transition: 0.2s;

    &:focus {
      box-shadow: 0 0 0 2px #00ffc2;
    }
  }

  ul {
    list-style: none;
    padding: 15px;
    position: absolute;
    border-radius: 10px;
    right: 0;
    background: var(--bg-menu);
  }
`;

const Result = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid white;
  border-radius: 7px;
  cursor: pointer;
  max-height: 15vh;
  width: 80vw;
  max-width: 300px;

  a {
    font-weight: bold;
    margin-bottom: 8px;
    color: inherit;
    text-decoration: none;

    h3 {
      font-size: 1.5em;
      margin: 10px 0;
    }

    span {
      opacity: 0.6;
    }
  }

  &:hover {
    color: #00ffc2;
    border: 1px solid #00ffc2;

    h3 {
      text-decoration: underline;
    }
  }

  &:first-child {
    border: 1px solid #00ffc2;
  }

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

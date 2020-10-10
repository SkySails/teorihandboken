import Link from "next/link";
import React, { Fragment, useCallback, useRef, useState } from "react";
import styled from "styled-components";

export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

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

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <SearchContainer ref={searchRef}>
      <input
        onChange={onChange}
        onFocus={onFocus}
        placeholder={"Sök inlägg"}
        type="search"
        value={query}
      />
      {active && results.length > 0 && (
        <ul>
          {results.map(({ slug, title, description }) => {
            console.log(description);
            return (
              <Result key={slug}>
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
  position: fixed;
  top: 10px;
  right: 10px;
  max-width: 300px;

  input {
    padding: 10px 15px;
    font-size: 1.5em;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

const Result = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid white;
  border-radius: 7px;
  cursor: pointer;

  a {
    font-weight: bold;
    margin-bottom: 8px;
    color: white;
    text-decoration: none;

    h3 {
      font-size: 1.5em;
      margin: 10px 0;
    }

    span {
      opacity: 0.6;
    }

    &:hover {
      color: #00ffc2;

      h3 {
        text-decoration: underline;
      }
    }
  }

  &:first-child {
    border: 1px solid #00ffc2;
  }

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

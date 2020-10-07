import MD from "react-markdown";
import Link from "next/link";

import React from "react";
import Highlight from "./Highlight";

export default function Markdown({ source }) {
  return (
    <MD
      source={source}
      plugins={[
        [
          require("remark-shortcodes"),
          { startBlock: "[[", endBlock: "]]", inlineMode: false },
        ],
      ]}
      renderers={{ shortcode: Shortcode, code: Highlighter, link: Linker }}
    />
  );
}

const Highlighter = (props) => {
  return <Highlight lang={props.language} code={props.value} />;
};

const Linker = (props) => {
  let text = props.children[0].props.children;
  if (props.href.charAt(0) === "#") {
    return (
      <a href={props.href} data-title={text}>
        {text}
      </a>
    );
  }
  return (
    <Link href={props.href}>
      <a data-title={text}>{text}</a>
    </Link>
  );
};

const Shortcode = (props) => {
  /*
    props will looks something like:
      {
        "type": "shortcode",
        "identifier": "MailchimpForm",
        "attributes": { "id": "chfk2" }
      }
    see: https://github.com/djm/remark-shortcodes
    */
  switch (props.identifier) {
    case "full-bleed":
      return (
        <div className="full-bleed">
          <img src={props.attributes.src} />
        </div>
      );
    default:
      throw new Error("unknown shortcode");
  }
};

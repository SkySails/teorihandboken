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
      renderers={{
        shortcode: Shortcode,
        code: Highlighter,
        link: Linker,
        heading: HeadingRenderer,
      }}
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
      <a href={props.href} className="markdown-link" data-title={text}>
        {text}
      </a>
    );
  }
  return (
    <Link href={props.href}>
      <a data-title={text} className="markdown-link">
        {text}
      </a>
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
          <img
            src={props.attributes.src}
            style={{ maxWidth: props.attributes.maxWidth }}
          />
        </div>
      );
    default:
      throw new Error("unknown shortcode");
  }
};

function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");
  var slug = text.toLowerCase().replace(/\s/g, "-");
  return React.createElement("h" + props.level, { id: slug }, props.children);
}

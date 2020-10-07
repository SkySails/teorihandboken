import React from "react";
import PrismHighlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";

export default function Highlight({ lang, code }) {
  return (
    <PrismHighlight
      {...defaultProps}
      theme={dracula}
      code={code}
      language={lang || "text"}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          data-title={lang}
          style={{ ...style, padding: "20px" }}
        >
          <code>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </PrismHighlight>
  );
}

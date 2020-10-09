import Head from "next/head";
import React from "react";

export default function DynamicHead({ data, slug }) {
  return (
    <Head>
      <title>
        {data.title} | {data.author}
      </title>
      <meta name="author" content={data.author} />
      <meta name="description" content={data.description} />

      <meta name="title" content={`${data.title} | ${data.author}`} />
      <meta name="description" content={data.description} />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://blog.hallstrom.dev/post/${slug}`}
      />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.img} />
      <meta property="og:site_name" content="Malte Hallström's Blog" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`https://blog.hallstrom.dev/post/${slug}`}
      />
      <meta property="twitter:title" content={data.title} />
      <meta property="twitter:description" content={data.description} />
      <meta property="twitter:image" content={data.img} />
      <meta name="twitter:creator" content="@malte_esaias"></meta>
    </Head>
  );
}

const fs = require("fs");
const matter = require("gray-matter");
const moment = require("moment");

function getPosts() {
  const files = fs.readdirSync(`${process.cwd()}/src/content`);
  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`src/content/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetadata);

    const formattedDate = moment(data.date).format("MMMM M, YYYY");

    const metadata = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filename.replace(".md", ""),
      ...metadata,
    };
  });
  return JSON.stringify(posts);
}

const fileContents = `export const posts = ${getPosts()}`;

try {
  fs.readdirSync("cache");
} catch (e) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/data.js", fileContents, (err) => {
  if (err) return console.error(error);
  console.log("Posts cached.");
});

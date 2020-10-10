import FuzzySearch from "fuzzy-search";
import { posts } from "../../cache/data";

const Search = (q) => {
  const SE = new FuzzySearch(
    posts,
    ["title", "description", "snippet", "tags"],
    {
      sort: true,
    }
  );
  return SE.search(q);
};

export default (req, res) => {
  const results = Search(req.query.q);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify([...results]));
};

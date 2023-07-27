import React from "react";
import NewsCard from "./NewsCard";
import WritingNewsCard from "./WritingNewsCard";

const NewsPage = async () => {
  const writing = true;
  return <>{writing ? <WritingNewsCard /> : <NewsCard />}</>;
};

export default NewsPage;

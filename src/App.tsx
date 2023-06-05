import React from "react";

import { Routes, Route } from "react-router-dom";
import "./App.css";
import ArticleList from "./components/ArticleList";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchArticles } from "./store/articles/fetchArticles";

function App() {
  const { articles } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Можно было добавить больше роутов

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ArticleList articles={articles} />} />
      </Routes>
    </div>
  );
}

export default App;

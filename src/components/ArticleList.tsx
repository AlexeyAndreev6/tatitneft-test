import React, { useState } from "react";
import Article from "./Article";
import { Post } from "./types";
import AddArticleForm from "./AddArticleForm";
import { Button, TextField } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { articleDeleted } from "../store/articles/articlesSlice";

interface ArticleListInterface {
  articles: Post[];
}

const filterPosts = (posts: Post[], searchText: string) => {
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.topic.toLowerCase().includes(searchText.toLowerCase())
  );
};

const sortPosts = (posts: Post[], sortBy: string) => {
  if (sortBy === "date") {
    return [...posts].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } else if (sortBy === "title") {
    return [...posts].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  } else if (sortBy === "author") {
    return [...posts].sort((a, b) => {
      return a.author.localeCompare(b.author);
    });
  } else {
    return posts;
  }
};

const ArticleList = ({ articles }: ArticleListInterface) => {
  const dispatch = useAppDispatch();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchText, setSearchText] = useState("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("");

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const openForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddClick = () => {
    openForm();
    setSelectedPost(null);
  };

  const removePost = (post: Post) => {
    dispatch(articleDeleted(post));
  };

  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
    openForm();
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const sortedPosts = sortPosts(filterPosts(articles, searchText), sortBy);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button variant="contained" onClick={handleAddClick}>
        Добавить статью
      </Button>
      <TextField
        sx={{ marginTop: 2 }}
        label="Поиск по заголовку или теме"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <div>
        <label>
          Сортировать по:
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="">без сортировки</option>
            <option value="date">дате</option>
            <option value="author">автор</option>
            <option value="title">заголовку</option>
          </select>
        </label>
      </div>
      <AddArticleForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        post={selectedPost}
      />
      {sortedPosts.length === 0
        ? "Нет статей"
        : sortedPosts.map((post) => (
            <>
              <Article
                key={post.id}
                post={post}
                handleEdit={handleEditClick}
                handleRemove={removePost}
              />
            </>
          ))}
    </div>
  );
};

export default ArticleList;

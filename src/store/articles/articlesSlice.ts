import { createSlice } from "@reduxjs/toolkit";
import { fetchArticles } from "./fetchArticles";
import { Post } from "../../components/types";

interface State {
  articles: Post[];
  status: string;
}

const initialState: State = {
  articles: [],
  status: "",
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle(state, action) {
      const payload: Post = action.payload;
      state.articles.push(payload);
    },
    articleUpdated(state, action) {
      const { id, body, author, title, date, topic } = action.payload;
      const existingArticle = state.articles.find(
        (article) => article.id === id
      );
      if (existingArticle) {
        existingArticle.body = body;
        existingArticle.author = author;
        existingArticle.title = title;
        existingArticle.date = date;
        existingArticle.topic = topic;
      }
    },
    articleDeleted(state, action) {
      const { id } = action.payload;
      const existingArticle = state.articles.find(
        (article) => article.id === id
      );
      if (existingArticle) {
        state.articles = state.articles.filter((article) => article.id !== id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchArticles.fulfilled, (state, { payload }) => {
      state.articles = payload;

      state.status = "idle";
    });

    builder.addCase(fetchArticles.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { addArticle, articleDeleted, articleUpdated } =
  articlesSlice.actions;

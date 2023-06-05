import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk("articles/fetch", async () => {
    const res = await fetch('http://localhost:3001/posts').then(
        (data) => data.json()
      )
      return res
});

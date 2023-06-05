import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { Post } from "./types";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch } from "../store/hooks";
import { addArticle, articleUpdated } from "../store/articles/articlesSlice";

interface formProps {
  isOpen: boolean;
  onClose: () => void;
  post?: Post | null;
}

const AddArticleForm = ({ post, isOpen, onClose }: formProps) => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs("2014-11-25T20:25:47.108Z")
  );

  // По хорошему ещё нужно добавить валидацию

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setAuthor(post.author);
      setTopic(post.topic);
      setDate(dayjs(post.date));
    } else {
      setTitle("");
      setBody("");
      setAuthor("");
      setTopic("");
      setDate(dayjs("2014-11-25T20:25:47.108Z"));
    }
  }, [post]);

  const handleSaveClick = () => {
    const newPost: Post = {
      id: post?.id || Date.now(),
      title,
      body,
      topic,
      author,
      date: date!.toISOString(),
      comments: post?.comments || [],
    };
    if (post) {
      dispatch(articleUpdated(newPost));
    } else {
      dispatch(addArticle(newPost));
    }
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          {post ? "Редактирование статьи" : "Добавление статьи"}
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 2 }}
            label="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            sx={{ marginTop: 2 }}
            label="Текст"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            sx={{ marginTop: 2 }}
            label="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
          />
          <TextField
            sx={{ marginTop: 2 }}
            label="Тема"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            fullWidth
          />
          <DatePicker
            sx={{ marginTop: 2 }}
            label="Дата"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Сохранить
          </Button>
          <Button variant="contained" onClick={onClose}>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddArticleForm;

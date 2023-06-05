import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post } from "./types";
import { Divider, Grid, TextField } from "@mui/material";

interface ArticleProps {
  post: Post;
  handleEdit: (post: Post) => void;
  handleRemove: (post: Post) => void;
}

export default function Article({
  post,
  handleEdit,
  handleRemove,
}: ArticleProps) {
  const [comments, setComments] = React.useState(post.comments);
  const [comment, setComment] = React.useState("");

  const date = new Date(post.date).toLocaleDateString();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      name: "User Name", // Здесь рандомное имя так как его надо будет получать от авторизованного пользователя
      id: Date.now(),
      email: "UserMail@mail.ru", // То же самое как и с именем
      body: comment,
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: 6 }}>
        <CardContent>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h6" component="span">
              Автор: {post.author}
            </Typography>
            <Typography gutterBottom variant="h6" component="span">
              Тема: {post.topic}
            </Typography>
            <Typography gutterBottom variant="h6" component="span">
              Дата: {date}
            </Typography>
          </Grid>
          <Divider />
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              handleEdit(post);
            }}
          >
            Редактировать
          </Button>
          <Button
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleRemove(post)}
          >
            Удалить
          </Button>
        </CardActions>
        <Typography variant="h6">Комментарии</Typography>
        {comments.map((comment) => (
          <Grid
            container
            key={comment.id}
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="body2"
              sx={{
                marginBottom: 2,
              }}
            >
              {comment.body}
            </Typography>
          </Grid>
        ))}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Оставьте комментарий"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" type="submit" color="primary">
            Отправить
          </Button>
        </form>
      </Card>
    </>
  );
}

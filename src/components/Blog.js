import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (event) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://blog-tncl.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  return (
    <div>
      <Card
      className="blog-card"
        mx={{
          width: "50%",
          margin: "auto",
          marginTop: 1,

          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "gray" }} aria-label="recipe">
              {userName && userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader=""
        />
        <CardMedia
          component="img"
          style={{ width: "100%", height: "auto" }}
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "}
            {content}
          </Typography>
        </CardContent>
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineOutlined color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </Box>
        )}
      </Card>
    </div>
  );
};

export default Blog;

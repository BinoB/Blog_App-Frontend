import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Grid } from "@mui/material";

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`https://blog-tncl.onrender.com/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  return (
    <div>
      <Grid container spacing={1}>
        {user &&
          user.blogs &&
          user.blogs.map((blog, index) => (
            <Grid key={blog.id} item  sm={4} >
              <Blog
                id={blog._id}
                key={index}
                isUser={true}
                title={blog.title}
                content={blog.content}
                image={blog.image}
                userName={user.name}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default UserBlogs;

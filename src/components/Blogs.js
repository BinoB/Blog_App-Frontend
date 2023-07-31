import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Grid } from "@mui/material";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  
  const sendRequest = async () => {
    const res = await axios
      .get("https://blog-tncl.onrender.com/api/blog")
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <div>
      <Grid container spacing={0}>
        {blogs.map((blog, index) => (
          <Grid key={blog.id} item  sm={4} >
            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              content={blog.content}
              image={blog.image}
              userName={blog.user.name}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Blogs;

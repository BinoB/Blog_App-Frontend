import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

function BlogDetail() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null); // Initialize with null
  const id = useParams().id;

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`https://blog-dcwf.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await sendRequest(); // Await the result
    console.log(data);
    navigate("/myBlogs");
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog); // Use data.blog to set the blog
      setInputs({
        title: data.blog.title,
        content: data.blog.content,
        image: data.blog.image,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`https://blog-dcwf.onrender.com/api/blog/update/${id}`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
      })
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  return (
    <div>
      {blog && ( // Check if blog is not null before rendering the form
        <form onSubmit={handleSubmit}>
          {/* ... rest of the JSX code ... */}
        </form>
      )}
    </div>
  );
}

export default BlogDetail;

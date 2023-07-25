import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function UserBlogs() {
  const [user, setUser] = useState(null); // Initialize with null
  const id = localStorage.getItem("userId");
  
  const sendRequest = async () => {
    const res = await axios
      .get(`https://blog-dcwf.onrender.com/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  return (
    <div>
      {user && user.blogs && user.blogs.length > 0 && // Check if user and user.blogs exist and the array is not empty
        user.blogs.map((blog) => (
          <Blog
            id={blog._id}
            key={blog._id} // Use a unique key, in this case, _id is used as a key
            isUser={true}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
}

export default UserBlogs;

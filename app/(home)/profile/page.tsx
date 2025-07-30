"use client";
import { TextField, Box, Button, Typography } from "@mui/material"; // ✅ VisuallyHiddenInput hata diya
import CloudUpload from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [posts, setposts] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
    return;
  };
  const handleSubmit = async () => {
    if (!image || !caption) {
      setMessage("Image and caption is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:8080/api/photos",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Image Uploaded Successfully"); // ✅ Spelling fix kiya
      setCaption("");
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed. Please try again"); // ✅ Spelling fix kiya
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/feed");
      setposts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  return (
    <>
            <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "start",
          paddingTop: "30px",
          alignItems: "center",
          height: "100%",
          backgroundImage: 'url("/signupbackgroundimage.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* 🔝 Top bar with logout and profile buttons */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            gap: "10px",
            paddingRight: "30px",
          }}
        >
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="contained" onClick={() => router.push("/home")}>
            HOME
          </Button>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Typography variant="h5" >Upload a photo with caption</Typography>

          {/* 📷 Image upload button */}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            Choose Photo
            <input type="file" hidden onChange={handleInputChange} />
          </Button>

          {/* 🖼️ Image preview */}
          {preview && (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          )}

          {/* ✍️ Caption text field */}
          <TextField
            label="Caption"
            variant="outlined"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            fullWidth
          />

          <Button variant="contained" onClick={handleSubmit}>
            Upload
          </Button>

          {/* 🔔 Success or error message */}
          {message && (
            <Typography color="secondary" variant="body2">
              {message}
            </Typography>
          )}
        </Box>

        {/* 🧾 All uploaded posts */}
        <Box
          sx={{
            marginTop: "40px",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "50px",
          }}
        >
          {posts.map((post) => (
            <Box
              key={post.id}
              sx={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: 2,
              }}
            >
              <Typography variant="subtitle2">@{post.username}</Typography>
              <Box
                component="img"
                src={`http://localhost:8080/uploads/${post.filename}`} // 👉 Image path from backend
                alt={post.caption}
                sx={{ width: "100%", maxHeight: "300px", objectFit: "cover", marginTop: "10px" }}
              />
              <Typography variant="body1" sx={{ marginTop: "10px" }}>
                {post.caption}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

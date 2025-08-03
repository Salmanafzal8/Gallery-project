"use client";
import { TextField, Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Layout from "../../layout";

import Contactus from "../contactus/page";

export default function Home() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/login");
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async () => {
    if (!image || !caption) {
      setMessage("Both image and caption are required.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/photos`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Upload successful!");
      setCaption("");
      setImage(null);
      setPage(1);
      setPosts([]);
      fetchPosts(1);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed. Try again.");
    }
  };

  const fetchPosts = async (currentPage: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/feed?page=${currentPage}&limit=10`
      );
      console.log("RESPONSE: ", response);
      const newPosts = response.data;
      setHasMore(newPosts.length === 10);
      setPosts((prev) => [...prev, ...newPosts]);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: 'url("/backgroundimage.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: { xs: 2, md: 6 },
          py: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="white"
          fontWeight="bold"
          mb={4}
        >
          Share a Moment ✨
        </Typography>
        <Button onClick={handleLogout}>LOGOUT</Button>
        {/* Upload Box */}
        <Contactus />
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: 4,
            borderRadius: 4,
            maxWidth: 500,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            boxShadow: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            Upload a Photo with Caption
          </Typography>

          <Button
            component="label"
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Choose Photo
            <input type="file" hidden onChange={handleInputChange} />
          </Button>
          {preview && (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 250,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          )}

          <TextField
            label="Caption"
            variant="outlined"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Upload
          </Button>

          {message && (
            <Typography variant="body2" align="center" color="secondary">
              {message}
            </Typography>
          )}
        </Box>

        {/* Posts Section */}
        <Box
          sx={{
            mt: 6,
            maxWidth: 700,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {posts.map((post) => (
            <Box
              key={post.id}
              sx={{
                backgroundColor: "#fff",
                padding: 3,
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h3"
                color="black"
                sx={{ fontWeight: "bold" }}
              >
                {post.username}
              </Typography>
              <Box
                component="img"
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/${post.filename}`}
                alt={post.caption}
                sx={{
                  width: "100%",
                  maxHeight: 350,
                  objectFit: "cover",
                  borderRadius: 2,
                  mt: 1,
                }}
              />
              <Typography
                variant="h5"
                mt={1}
                sx={{
                  background: "black",
                  color: "white",
                  borderRadius: "10px",
                  padding: "5px",
                }}
              >
                Caption
              </Typography>
              <Typography variant="h4" mt={1}>
                {post.caption}
              </Typography>
            </Box>
          ))}
        </Box>

        {hasMore && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="outlined"
              // onClick={handleLoadMore}
              onScroll={handleLoadMore}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                ":hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

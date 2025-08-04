"use client";

import {
  TextField,
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";

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
  const observer = useRef<IntersectionObserver | null>(null);
  const theme = useTheme();

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/auth/login");
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
      const newPosts = response.data;
      setHasMore(newPosts.length === 10);
      setPosts((prev) => [...prev, ...newPosts]);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPosts(nextPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, page]
  );

  return (
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
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        color="white"
        fontWeight="bold"
        mb={4}
      >
        Share a Moment
      </Typography>

      {/* Upload Form */}
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
              height: 200,
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

      <Box sx={{ mt: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {posts.map((post, index) => {
            const isLast = index === posts.length - 1;
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={post.id}
                ref={isLast ? lastPostRef : null}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/${post.filename}`}
                    alt={post.caption}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Posted by: {post.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        background: "black",
                        color: "white",
                        p: 1,
                        borderRadius: 1,
                      }}
                    >
                      {" "}
                      <Typography variant="h6">Capiton:</Typography>
                      {post.caption}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Layout from "../../layout";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<{
    id: number;
    username: string;
    bio: string;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedCaption, setEditedCaption] = useState<string>("");

  useEffect(() => {
    fetchUserData();
    fetchPosts();
  }, []);

  const fetchUserData = async () => {
    const userID = localStorage.getItem("userId"); // fixed
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }
    // console.log("API POINT: ", `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userID}`)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      console.log(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchPosts = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/photos/user/${userId}`
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };
  const deletePhoto = async (postId: number) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/photos/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Photo deleted succesfully");
      fetchPosts();
    } catch (error) {
      console.error("Server error while deleting", error);
      toast.error("Failed to delete Photo");
    }
  };

  const updateCaption = async (postId: number) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/photos/${postId}`,
        { caption: editedCaption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Photo Edited succesfully");
      setEditingPostId(null);
      fetchPosts();
    } catch (error) {
      console.error("Error updating caption:", error);
      toast.error("Failed to update caption ");
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage: 'url("/backgroundimage.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: 2,
        }}
      >
        <Typography variant="h4" color="white" gutterBottom>
          Profile: {user?.username}
        </Typography>
        <Typography variant="subtitle1" color="white" gutterBottom>
          Bio:{"    "}
          {user?.bio}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
            mt: 4,
            width: "100%",
            maxWidth: 900,
          }}
        >
          {posts.map((post) => (
            <Card key={post.id} elevation={4} sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="240"
                image={`${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/${post.filename}`}
                alt={post.caption}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/placeholder.jpg")
                }
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                {editingPostId === post.id ? (
                  <TextField
                    value={editedCaption}
                    onChange={(e) => setEditedCaption(e.target.value)}
                    fullWidth
                    variant="standard"
                    autoFocus
                  />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setEditingPostId(post.id);
                      setEditedCaption(post.caption);
                    }}
                  >
                    {post.caption}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => deletePhoto(post.id)}
                >
                  Delete
                </Button>
                {editingPostId === post.id ? (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => updateCaption(post.id)}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setEditingPostId(post.id);
                      setEditedCaption(post.caption);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  );
}

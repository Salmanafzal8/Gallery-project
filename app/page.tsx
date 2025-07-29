"use client";
import { TextField, Box, Button, Typography, Input } from "@mui/material";
import React, { useState } from "react";
import acios from "axios";

export default function Home() {
  const [caption, setcaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image || !caption) setMessage("Image and caption is required");
    return;
  };
  const formData = new FormData();
  formData.append("image", image);
  formData.append("caption", caption);

  try {

   const token = localStorage.getItem("authToken")




  }

  return (
    <div>
      <Box>
        <Input
          type="file"
          inputProps={{ accept: "image/*" }}
          // onChange={handleFileChange}
          style={{ display: "none" }} // Hide the default input
          id="image-upload-input"
        />{" "}
        <TextField
          id="outlined-basic"
          label="Caption"
          variant="outlined"
          // value={caption}
          // onChange={(e) => setCaption(e.target.value)}
        />
      </Box>
      jsjsjsjsjsjj
    </div>
  );
}

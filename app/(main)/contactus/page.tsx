"use client";

import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Layout from "../../layout";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
export default function Contactus() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      toast.error("Kindly fill the details properly");
    }
    toast.success("Your message is received! We will contact you later");
    setMessage("");
    setEmail("");
    setName("");
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ paddingTop: 8, backgroundColor: "white" }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <ContactMailIcon color="primary" />
          <Typography variant="h4" fontWeight="bold">
            Contact Us
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box
          component="form"
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth
            required
          />
          <TextField
            label="Your Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            value={message}
            multiline
            rows={4}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ width: "150px" }}
          >
            Send Message
          </Button>
        </Box>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  );
}

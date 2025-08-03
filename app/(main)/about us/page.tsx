"use client";
import { Box, Typography, Container, Divider, Paper } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 8, paddingBottom: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <InfoIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" fontWeight="bold">
            About Us
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" fontSize={18} color="text.secondary">
          Welcome to our Image Sharing App! 📸<br /><br />
          This platform allows users to upload images with captions, view public posts, and manage their profile.
          Its built with ❤️ using <strong>Next.js</strong> and <strong>Material UI</strong> to provide a clean and user-friendly experience.<br /><br />
          We believe in simple, fast, and secure sharing. Whether its a memory, moment, or message — share it with the world!
        </Typography>
      </Paper>
    </Container>
  );
}

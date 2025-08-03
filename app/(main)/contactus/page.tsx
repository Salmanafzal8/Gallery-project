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
import Layout from "../../layout"; // 🛠️ Layout import kiya

export default function Contactus () {
  return (
    <Layout> {/* ✅ Layout wrapper shuru */}
      <Container maxWidth="sm" sx={{ paddingTop: 8 }}>
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
          <TextField label="Your Name" variant="outlined" fullWidth required />
          <TextField
            label="Your Email"
            type="email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" sx={{ width: "150px" }}>
            Send Message
          </Button>
        </Box>
      </Container>
    </Layout> // ✅ Layout wrapper end
  );
}

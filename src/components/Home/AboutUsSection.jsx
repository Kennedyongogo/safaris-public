import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Groups } from "@mui/icons-material";

const MotionBox = motion(Box);

export default function AboutUsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const handleMeetTeam = () => {
    navigate("/team");
  };

  return (
    <Box
      id="about-section"
      sx={{
        py: { xs: 1, sm: 1.5, md: 2 },
        position: "relative",
        zIndex: 1,
        background: "transparent",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 1.5, sm: 1.5, md: 1.5 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            py: { xs: 1.5, sm: 2, md: 2.5 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "white",
            border: "1px solid #e0e0e0",
            minHeight: "auto",
            height: "auto",
          }}
        >
          <Grid container spacing={2}>
            {/* Left Column - Image */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "300px", md: "400px" },
                  borderRadius: { xs: 2, md: 3 },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src="/images/safari-about.jpg"
                  alt="Safari scene with leopards"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // Fallback to a placeholder or default image
                    e.target.src =
                      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop";
                  }}
                />
              </Box>
            </Grid>

            {/* Right Column - Text and Button */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: { xs: "auto", md: "100%" },
                  p: { xs: 2, md: 3 },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 1.5, md: 2 },
                    color: "#5D4037", // Dark brown
                    fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                  }}
                >
                  About Us
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 1.5, md: 2 },
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  Akira Safaris opens the door to Africa's awe-inspiring beauty,
                  wonders, and hidden treasures. Our dedicated experts are here
                  to create a transformative journey, making sure you feel the
                  vibrant pulse of this extraordinary continent every step of
                  the way.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 2, md: 3 },
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  Join us for a journey where every moment is an opportunity to
                  discover and savor the magic of Africa. Ready to make lifelong
                  memories?
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<Groups />}
                  onClick={handleMeetTeam}
                  sx={{
                    alignSelf: { xs: "stretch", sm: "flex-start" },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#D2B48C", // Light brown/tan
                    color: "#5D4037", // Dark brown text
                    fontWeight: 600,
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    textTransform: "none",
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:hover": {
                      backgroundColor: "#C9A96B",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Meet the Team
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

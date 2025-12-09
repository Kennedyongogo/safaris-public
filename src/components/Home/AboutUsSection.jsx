import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  VolunteerActivism,
  School,
  Psychology,
  LocalHospital,
  Favorite,
  LocationOn,
  Email,
  Phone,
  VerifiedUser,
  Groups,
  Handshake,
  TrendingUp,
} from "@mui/icons-material";

const MotionBox = motion(Box);

export default function AboutUsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const focusAreas = [
    {
      icon: <School />,
      title: "Education",
      description:
        "We promote access to quality education for underprivileged learners, ensuring that financial constraints do not prevent children and youth from accessing learning opportunities that can transform their futures.",
      color: "#4caf50",
    },
    {
      icon: <Psychology />,
      title: "Mental Health Awareness",
      description:
        "We raise awareness about mental health and provide psychosocial support services, recognizing that mental well-being is fundamental to individual and community development.",
      color: "#9c27b0",
    },
    {
      icon: <TrendingUp />,
      title: "Poverty Alleviation & Empowerment",
      description:
        "We implement programs aimed at reducing poverty and promoting economic empowerment, helping individuals and families build sustainable livelihoods and achieve financial independence.",
      color: "#ff9800",
    },
    {
      icon: <LocalHospital />,
      title: "Health & Wellness",
      description:
        "We promote preventive and curative healthcare initiatives, working to improve health outcomes and ensure communities have access to essential health services.",
      color: "#f44336",
    },
  ];

  const values = [
    { name: "Integrity", icon: <VerifiedUser /> },
    { name: "Accountability", icon: <Handshake /> },
    { name: "Inclusivity", icon: <Groups /> },
    { name: "Professionalism", icon: <VolunteerActivism /> },
    { name: "Service to Humanity", icon: <Favorite /> },
  ];

  return (
    <Box
      id="about-section"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        backgroundColor: "#f8f9fa",
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <VolunteerActivism
                sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, color: "primary.main" }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
                }}
              >
                About Us
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 800,
                mx: "auto",
                fontSize: { xs: "0.875rem", md: "1rem" },
                lineHeight: 1.6,
              }}
            >
              Transforming lives and empowering communities across Kenya
            </Typography>
          </Box>

          {/* Who We Are */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              mb: { xs: 3, md: 4 },
              borderRadius: { xs: 3, md: 4 },
              background: "white",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Who We Are
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "text.primary",
                fontSize: { xs: "0.875rem", md: "1rem" },
                mb: 2,
              }}
            >
              Mwalimu Hope Foundation is a registered non-profit, non-political,
              and non-sectarian charitable organization dedicated to transforming
              lives and empowering communities across Kenya. Founded in 2025 and
              based in Bungoma, we are committed to creating lasting positive
              change through education, health advocacy, and community empowerment.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "text.primary",
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              Registered under the laws of Kenya as a charitable foundation
              committed to serving vulnerable communities and promoting sustainable
              development.
            </Typography>
          </Paper>

          {/* Vision & Mission */}
          <Grid container spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, sm: 4 },
                  height: "100%",
                  borderRadius: { xs: 3, md: 4 },
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                  border: "1px solid rgba(102, 126, 234, 0.2)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Favorite sx={{ color: "#667eea", fontSize: { xs: "1.5rem", md: "2rem" } }} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#667eea",
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    Our Vision
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  To create a society where every individual has access to quality
                  education, mental health support, and sustainable livelihoods,
                  enabling them to reach their full potential and contribute
                  meaningfully to their communities.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, sm: 4 },
                  height: "100%",
                  borderRadius: { xs: 3, md: 4 },
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                  border: "1px solid rgba(102, 126, 234, 0.2)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <VolunteerActivism sx={{ color: "#667eea", fontSize: { xs: "1.5rem", md: "2rem" } }} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#667eea",
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    Our Mission
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: "text.primary",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  To empower communities through comprehensive education programs,
                  health advocacy, and poverty alleviation initiatives that promote
                  sustainable development and improve the quality of life for
                  vulnerable populations in Kenya.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* What We Do */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              mb: { xs: 3, md: 4 },
              borderRadius: { xs: 3, md: 4 },
              background: "white",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: { xs: 3, md: 4 },
                textAlign: "center",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              What We Do
            </Typography>
            <Grid container spacing={3}>
              {focusAreas.map((area, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: { xs: 2, md: 3 },
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))",
                        border: "1px solid rgba(102, 126, 234, 0.1)",
                        height: "100%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 10px 30px rgba(102, 126, 234, 0.2)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: `${area.color}15`,
                            color: area.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {React.cloneElement(area.icon, {
                            sx: { fontSize: { xs: "1.5rem", md: "2rem" } },
                          })}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: area.color,
                            fontSize: { xs: "1rem", md: "1.25rem" },
                          }}
                        >
                          {area.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.7,
                          color: "text.secondary",
                          fontSize: { xs: "0.8rem", md: "0.9rem" },
                        }}
                      >
                        {area.description}
                      </Typography>
                    </Box>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Our Values */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              mb: { xs: 3, md: 4 },
              borderRadius: { xs: 3, md: 4 },
              background: "white",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: { xs: 3, md: 4 },
                textAlign: "center",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Our Values
            </Typography>
            <Grid container spacing={2}>
              {values.map((value, index) => (
                <Grid item xs={6} sm={4} md={2.4} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        p: { xs: 2, md: 2.5 },
                        borderRadius: { xs: 2, md: 3 },
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 20px rgba(102, 126, 234, 0.2)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 1,
                          color: "#667eea",
                        }}
                      >
                        {React.cloneElement(value.icon, {
                          sx: { fontSize: { xs: "1.5rem", md: "2rem" } },
                        })}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#667eea",
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
                        }}
                      >
                        {value.name}
                      </Typography>
                    </Box>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Contact Information */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: { xs: 3, md: 4 },
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))",
              border: "1px solid rgba(102, 126, 234, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: { xs: 3, md: 4 },
                textAlign: "center",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    background: "white",
                  }}
                >
                  <LocationOn sx={{ color: "#667eea", fontSize: "1.5rem", mt: 0.5 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 0.5, color: "#667eea" }}
                    >
                      Physical Address
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                    >
                      Meghon Plaza, Bungoma Town, along Moi Avenue
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", md: "0.9rem" }, mt: 0.5 }}
                    >
                      P.O. Box 2072-50200, Bungoma, Kenya
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    background: "white",
                  }}
                >
                  <Email sx={{ color: "#667eea", fontSize: "1.5rem", mt: 0.5 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 0.5, color: "#667eea" }}
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                    >
                      simiyuleviticus93@gmail.com
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    background: "white",
                  }}
                >
                  <Groups sx={{ color: "#667eea", fontSize: "1.5rem", mt: 0.5 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 0.5, color: "#667eea" }}
                    >
                      Leadership
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: { xs: "0.75rem", md: "0.85rem" } }}
                    >
                      CEO/Founder: Simiyu Leviticus
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: { xs: "0.75rem", md: "0.85rem" } }}
                    >
                      Secretary: Anjeline Nafula Juma
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: { xs: "0.75rem", md: "0.85rem" } }}
                    >
                      Advisor: Dr. Mbiti Mwondi
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}


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
import {
  VolunteerActivism,
  School,
  Psychology,
  LocalHospital,
  Favorite,
  LocationOn,
  Email,
  Groups,
  Handshake,
  TrendingUp,
  VerifiedUser,
  ArrowBack,
} from "@mui/icons-material";

const MotionBox = motion(Box);

export default function AboutUs() {
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate("/");
    setTimeout(() => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <>
      {/* Global background styles */}
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          html {
            height: 100%;
            overflow-y: scroll;
            scroll-behavior: smooth;
          }
          html, body, #root {
            background: #f8f9fa !important;
            background-attachment: fixed !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body {
            min-height: 100%;
            overflow-x: hidden;
          }
          #root {
            min-height: 100vh;
          }
        `}
      </style>

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          background: "transparent",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 1, sm: 1.5, md: 2 },
            px: { xs: 0.25, sm: 0.375 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                onClick={handleBack}
                sx={{
                  mb: 1.5,
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  "&:hover": {
                    background: "linear-gradient(135deg, #5568d3, #653a8b)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Back to Home
              </Button>

              {/* Page Title */}
              <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
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
                    sx={{
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      color: "primary.main",
                    }}
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
            </Box>

            {/* Who We Are */}
            <Paper
              elevation={3}
              sx={{
                p: { xs: 1, sm: 1.5, md: 2 },
                mb: 1.5,
                borderRadius: { xs: 3, md: 4 },
                background: "white",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.2rem", md: "1.45rem" },
                }}
              >
                Who We Are
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: "text.primary",
                  fontSize: { xs: "0.7rem", md: "0.8rem" },
                  mb: 1,
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
                  fontSize: { xs: "0.7rem", md: "0.8rem" },
                }}
              >
                Registered under the laws of Kenya as a charitable foundation
                committed to serving vulnerable communities and promoting sustainable
                development.
              </Typography>
            </Paper>

            {/* Vision & Mission */}
            <Grid container spacing={1.5} sx={{ mb: { xs: 1.5, md: 2 } }}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 1, sm: 1.5 },
                    height: "100%",
                    borderRadius: { xs: 3, md: 4 },
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                    border: "1px solid rgba(102, 126, 234, 0.2)",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                  >
                    <Favorite
                      sx={{
                        color: "#667eea",
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#667eea",
                        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.45rem" },
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
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
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
                    p: { xs: 1, sm: 1.5 },
                    height: "100%",
                    borderRadius: { xs: 3, md: 4 },
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                    border: "1px solid rgba(102, 126, 234, 0.2)",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                  >
                    <VolunteerActivism
                      sx={{
                        color: "#667eea",
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#667eea",
                        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.45rem" },
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
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
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
                p: { xs: 1, sm: 1.5, md: 2 },
                mb: 1.5,
                borderRadius: { xs: 3, md: 4 },
                background: "white",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 1.5, md: 2 },
                  textAlign: "center",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.2rem", md: "1.45rem" },
                }}
              >
                What We Do
              </Typography>
              <Grid container spacing={1.5}>
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
                          p: { xs: 1, md: 1.5 },
                          borderRadius: { xs: 2, md: 3 },
                          background:
                            "linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))",
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
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 2,
                              backgroundColor: `${area.color}15`,
                              color: area.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {React.cloneElement(area.icon, {
                              sx: { fontSize: { xs: "1.2rem", md: "1.5rem" } },
                            })}
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: area.color,
                              fontSize: { xs: "0.85rem", md: "1rem" },
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
                            fontSize: { xs: "0.65rem", md: "0.75rem" },
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
                p: { xs: 1, sm: 1.5, md: 2 },
                mb: 1.5,
                borderRadius: { xs: 3, md: 4 },
                background: "white",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 1.5, md: 2 },
                  textAlign: "center",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.2rem", md: "1.45rem" },
                }}
              >
                Our Values
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: { xs: "nowrap", sm: "wrap" },
                  gap: { xs: 1, sm: 1 },
                  width: "100%",
                }}
              >
                {values.map((value, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    sx={{
                      flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)", md: "1 1 calc(20% - 8px)" },
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        p: { xs: 1, md: 1.5 },
                        borderRadius: { xs: 2, md: 3 },
                        background:
                          "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
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
                          mb: 0.5,
                          color: "#667eea",
                        }}
                      >
                        {React.cloneElement(value.icon, {
                          sx: { fontSize: { xs: "1.2rem", md: "1.5rem" } },
                        })}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#667eea",
                          fontSize: { xs: "0.65rem", md: "0.75rem" },
                        }}
                      >
                        {value.name}
                      </Typography>
                    </Box>
                  </MotionBox>
                ))}
              </Box>
            </Paper>

            {/* Contact Information */}
            <Paper
              elevation={3}
              sx={{
                p: { xs: 1, sm: 1.5, md: 2 },
                borderRadius: { xs: 3, md: 4 },
                background:
                  "linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))",
                border: "1px solid rgba(102, 126, 234, 0.2)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 1.5, md: 2 },
                  textAlign: "center",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.2rem", md: "1.45rem" },
                }}
              >
                Contact Information
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 1, md: 1.5 },
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    p: 1,
                    borderRadius: 2,
                    background: "white",
                    flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 10px)" },
                    minWidth: 0,
                  }}
                >
                  <LocationOn
                    sx={{ color: "#667eea", fontSize: "1.2rem", mt: 0.5 }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: "#667eea",
                        fontSize: { xs: "0.7rem", md: "0.8rem" },
                      }}
                    >
                      Physical Address
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.65rem", md: "0.75rem" },
                      }}
                    >
                      Meghon Plaza, Bungoma Town, along Moi Avenue
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.65rem", md: "0.75rem" },
                        mt: 0.5,
                      }}
                    >
                      P.O. Box 2072-50200, Bungoma, Kenya
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    p: 1,
                    borderRadius: 2,
                    background: "white",
                    flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 10px)" },
                    minWidth: 0,
                  }}
                >
                  <Email
                    sx={{ color: "#667eea", fontSize: "1.2rem", mt: 0.5 }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: "#667eea",
                        fontSize: { xs: "0.7rem", md: "0.8rem" },
                      }}
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.65rem", md: "0.75rem" },
                      }}
                    >
                      simiyuleviticus93@gmail.com
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    p: 1,
                    borderRadius: 2,
                    background: "white",
                    flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 10px)" },
                    minWidth: 0,
                  }}
                >
                  <Groups
                    sx={{ color: "#667eea", fontSize: "1.2rem", mt: 0.5 }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: "#667eea",
                        fontSize: { xs: "0.7rem", md: "0.8rem" },
                      }}
                    >
                      Leadership
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.6rem", md: "0.7rem" },
                      }}
                    >
                      CEO/Founder: Simiyu Leviticus
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.6rem", md: "0.7rem" },
                      }}
                    >
                      Secretary: Anjeline Nafula Juma
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.6rem", md: "0.7rem" },
                      }}
                    >
                      Advisor: Dr. Mbiti Mwondi
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </MotionBox>
        </Container>
      </Box>
    </>
  );
}


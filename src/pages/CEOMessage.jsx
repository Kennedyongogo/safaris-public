import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  RecordVoiceOver,
  ArrowBack,
  Person,
  ArrowForward,
} from "@mui/icons-material";

const MotionBox = motion(Box);

export default function CEOMessage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // CEO image URL - can be updated when image is available
  const ceoImageUrl = "/FB_IMG_1765129599101.jpg"; // Set this to the CEO image path when available
  
  const buildImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http")) return imageUrl;
    if (imageUrl.startsWith("uploads/")) return `/${imageUrl}`;
    if (imageUrl.startsWith("/uploads/")) return imageUrl;
    return imageUrl;
  };

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
          maxWidth="xl"
          sx={{
            pt: { xs: 1, sm: 1.5, md: 2 },
            pb: { xs: 0.5, sm: 0.75, md: 1 },
            px: { xs: 2, sm: 3, md: 4 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation Button */}
            <Tooltip title="Back to the homepage" arrow>
              <Button
                onClick={handleBack}
                sx={{
                  mb: 2,
                  minWidth: "auto",
                  width: { xs: 32, md: 36 },
                  height: { xs: 32, md: 36 },
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5568d3, #653a8b)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                  },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  "& .MuiSvgIcon-root": {
                    fontSize: { xs: "1.2rem", md: "1.4rem" },
                  },
                }}
              >
                <ArrowBack />
              </Button>
            </Tooltip>
            {/* Split Layout Container */}
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                borderRadius: { xs: 2, md: 4 },
                overflow: "hidden",
                background: "#ffffff",
                border: "1px solid #e0e0e0",
                minHeight: { xs: "auto", md: "450px" },
              }}
            >
              {/* Left Side - CEO Image */}
              <Box
                sx={{
                  width: { xs: "100%", md: "40%" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: { xs: 3, md: 4 },
                  position: "relative",
                  background: "transparent",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: 180, sm: 220, md: 250 },
                    height: { xs: 180, sm: 220, md: 250 },
                  }}
                >
                  {/* Circular Image Frame */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "6px solid white",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                      position: "relative",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                    }}
                  >
                    {ceoImageUrl ? (
                      <Box
                        component="img"
                        src={buildImageUrl(ceoImageUrl)}
                        alt="Simiyu Leviticus - CEO"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <Box
                      sx={{
                        display: ceoImageUrl ? "none" : "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        color: "white",
                      }}
                    >
                      <Person
                        sx={{
                          fontSize: { xs: "5rem", sm: "6rem", md: "8rem" },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* CEO Name Overlay at Bottom Left */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: { xs: -10, md: -15 },
                      left: { xs: 10, md: 20 },
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      px: { xs: 1.5, md: 2 },
                      py: { xs: 0.75, md: 1 },
                      borderRadius: { xs: 1, md: 1.5 },
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                        color: "#333",
                        lineHeight: 1.2,
                      }}
                    >
                      Simiyu Leviticus
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" },
                        color: "#666",
                        lineHeight: 1.2,
                        mt: 0.25,
                      }}
                    >
                      CEO & Founder
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Right Side - Message Content */}
              <Box
                sx={{
                  width: { xs: "100%", md: "60%" },
                  p: { xs: 2.5, sm: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Main Title */}
                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.75rem" },
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                    lineHeight: 1.2,
                    fontFamily: "sans-serif",
                  }}
                >
                  MESSAGE FROM CEO
                </Typography>

                {/* Horizontal Line Separator */}
                <Box
                  sx={{
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, #ddd 0%, transparent 100%)",
                    mb: 3,
                  }}
                />

                {/* Message Content */}
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                    color: "#666",
                    mb: 2,
                    fontFamily: "sans-serif",
                  }}
                >
                  Welcome to Mwalimu Hope Foundation. Since our founding in 2025 in Bungoma, our mission has been to transform lives across Kenya by expanding access to education, mental health support, healthcare, and sustainable livelihoods. Education remains central to our work because we believe it is the key to breaking the cycle of poverty.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                    color: "#666",
                    mb: 2,
                    fontFamily: "sans-serif",
                  }}
                >
                  With over 500 lives impacted, more than 50 communities reached, and 1,000 volunteers engaged, our progress reflects real stories of hope—children back in school, families becoming economically stable, and individuals receiving much-needed support.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                    color: "#666",
                    fontFamily: "sans-serif",
                  }}
                >
                  I invite you to join us on this journey. Whether through partnerships, donations, or volunteering, your contribution helps us build a brighter, more resilient future for all.
                </Typography>
              </Box>
            </Paper>
          </MotionBox>
        </Container>
      </Box>
    </>
  );
}


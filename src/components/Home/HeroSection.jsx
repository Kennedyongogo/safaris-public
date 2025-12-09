import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Container,
  Tooltip,
  Button,
  Fade,
  Slide,
} from "@mui/material";
import { CameraAlt, Terrain, Explore, ArrowForward } from "@mui/icons-material";

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const videoRefs = useRef([]);
  const videos = [
    "/videos/14850335_2160_3840_30fps.mp4",
    "/videos/11760755-uhd_2160_4096_30fps.mp4",
    "/videos/5446310-hd_1920_1080_30fps.mp4",
    "/videos/3842816-uhd_3840_2160_30fps.mp4",
    "/videos/4829604-uhd_3840_2160_30fps.mp4",
    "/videos/3196505-sd_960_540_30fps.mp4",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    // Play the current video and pause others
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.currentTime = 0; // Reset to start
          video.play().catch((error) => {
            console.log("Video play error:", error);
          });
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  const handleExploreAboutUs = () => {
    navigate("/about-us");
  };

  return (
    <Box
      id="hero-section"
      sx={{
        position: "relative",
        height: { xs: "100vh", md: "100vh" },
        width: "100%",
        overflow: "hidden",
        marginTop: "-64px",
      }}
    >
      {/* Background Videos */}
      {videos.map((video, index) => (
        <Box
          key={index}
          component="video"
          ref={(el) => (videoRefs.current[index] = el)}
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
            opacity: currentVideoIndex === index ? 1 : 0,
            zIndex: currentVideoIndex === index ? 0 : -1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Floating Particles Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "4px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "6px",
            height: "6px",
            background: "rgba(33, 150, 243, 0.8)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite reverse",
          },
        }}
      />

      {/* Content Overlay */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          zIndex: 3,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Fade in={isVisible} timeout={1000}>
          <Box
            sx={{
              maxWidth: "700px",
              animation: "slideInUp 1.2s ease-out",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3.5rem",
                  lg: "4rem",
                },
                fontWeight: 700,
                mb: 2,
                textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
                background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}
            >
              Akira Safaris
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                opacity: 0.95,
                fontWeight: 400,
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                color: "#e3f2fd",
              }}
            >
              Discover the Wild Heart of Africa
            </Typography>

            {/* Enhanced Call-to-Action Button */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                mb: { xs: 6, sm: 5, md: 4 },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForward />}
                onClick={handleExploreAboutUs}
                sx={{
                  px: 2,
                  py: 0.75,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  background:
                    "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                  boxShadow: "0 8px 32px rgba(33, 150, 243, 0.3)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "& .MuiButton-endIcon": {
                    marginLeft: 0.5,
                  },
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: "0 12px 40px rgba(33, 150, 243, 0.4)",
                    background:
                      "linear-gradient(45deg, #1976d2 30%, #1cb5e0 90%)",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
              >
                Explore About Us
              </Button>
            </Box>
          </Box>
        </Fade>
      </Box>

      {/* Enhanced Feature Icons */}
      <Slide direction="up" in={isVisible} timeout={1500}>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 4,
            p: 2.5,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Tooltip title="Safari Tours" arrow>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "white",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.1)",
                  "& .icon": {
                    color: "#2196f3",
                    transform: "rotate(360deg)",
                  },
                },
              }}
            >
              <CameraAlt
                className="icon"
                sx={{ fontSize: 28, transition: "all 0.4s ease" }}
              />
              <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>
                Safari Tours
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Wildlife Viewing" arrow>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "white",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.1)",
                  "& .icon": {
                    color: "#4caf50",
                    transform: "rotate(360deg)",
                  },
                },
              }}
            >
              <Terrain
                className="icon"
                sx={{ fontSize: 28, transition: "all 0.4s ease" }}
              />
              <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>
                Wildlife Viewing
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Adventure Tours" arrow>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "white",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.1)",
                  "& .icon": {
                    color: "#ff9800",
                    transform: "rotate(360deg)",
                  },
                },
              }}
            >
              <Explore
                className="icon"
                sx={{ fontSize: 28, transition: "all 0.4s ease" }}
              />
              <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>
                Adventure Tours
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Slide>

      <style>
        {`
          @keyframes slideInUp {
            from { 
              opacity: 0;
              transform: translateY(60px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
              opacity: 0.6;
            }
            50% { 
              transform: translateY(-20px) rotate(180deg);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
}

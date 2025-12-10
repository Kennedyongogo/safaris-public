import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LocationOn,
  Schedule,
  People,
  ArrowBack,
  Image as ImageIcon,
} from "@mui/icons-material";

const MotionBox = motion(Box);

// Dummy destination data - same as in ServicesSection
const dummyDestinations = [
  {
    id: 1,
    title: "Maasai Mara National Reserve",
    description:
      "Experience the Great Migration and witness the Big Five in their natural habitat. Home to over 1.5 million wildebeest, zebras, and gazelles.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    location: "Narok County, Kenya",
    duration: "3-5 Days",
    bestTime: "July - October",
    wildlife: "Big Five, Great Migration",
    highlights: ["Game Drives", "Hot Air Balloon Safari", "Cultural Visits"],
  },
  {
    id: 2,
    title: "Amboseli National Park",
    description:
      "Famous for its large elephant herds and stunning views of Mount Kilimanjaro. A photographer's paradise with diverse wildlife and breathtaking landscapes.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    location: "Kajiado County, Kenya",
    duration: "2-4 Days",
    bestTime: "June - September",
    wildlife: "Elephants, Lions, Cheetahs",
    highlights: [
      "Elephant Viewing",
      "Mount Kilimanjaro Views",
      "Bird Watching",
    ],
  },
  {
    id: 3,
    title: "Samburu National Reserve",
    description:
      "Discover unique wildlife species found only in northern Kenya, including the Grevy's zebra, Somali ostrich, and reticulated giraffe.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    location: "Samburu County, Kenya",
    duration: "3-4 Days",
    bestTime: "January - March, July - October",
    wildlife: "Grevy's Zebra, Reticulated Giraffe",
    highlights: ["Special Five", "River Safaris", "Cultural Experiences"],
  },
];

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine where user came from based on location state or referrer
  const cameFromDestinations = location.state?.from === "/destinations" || 
    document.referrer.includes("/destinations");

  useEffect(() => {
    // Using dummy data for now
    const foundDestination = dummyDestinations.find(
      (dest) => dest.id === parseInt(id)
    );
    if (foundDestination) {
      setDestination(foundDestination);
      setLoading(false);
    } else {
      setError("Destination not found");
      setLoading(false);
    }

    // Commented out API call - using dummy data
    // fetchDestinationDetails();
  }, [id]);

  // Commented out API fetch logic
  // const fetchDestinationDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`/api/destinations/${id}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch destination details");
  //     }
  //     const data = await response.json();
  //     if (data.success && data.data) {
  //       setDestination(data.data);
  //     } else {
  //       throw new Error("Destination not found");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching destination details:", err);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !destination) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Destination not found"}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          variant="contained"
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 3,
        px: 0,
        bgcolor: "#FAF0E6", // Light beige/cream background
        background:
          "linear-gradient(135deg, rgba(250, 240, 230, 0.95) 0%, rgba(255, 250, 240, 0.98) 50%, rgba(245, 245, 220, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 140, 66, 0.08) 0%, transparent 50%)",
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0.75, sm: 0.75, md: 0.75 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Button
            startIcon={<ArrowBack />}
            onClick={() => {
              if (cameFromDestinations) {
                // Navigate back to destinations page
                navigate("/destinations");
              } else {
                // Navigate to home and scroll to destinations section
                navigate("/");
                setTimeout(() => {
                  const section = document.getElementById("mission-section");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }, 100);
              }
            }}
            sx={{
              mb: 1,
              backgroundColor: "#FF6B35", // Warm orange
              color: "white",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#FF8C42", // Lighter warm orange on hover
                color: "white",
              },
            }}
          >
            {cameFromDestinations ? "Back to Destinations" : "Back to Home"}
          </Button>

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
              overflow: "hidden",
            }}
          >
            {/* Hero Image */}
            <Box
              sx={{
                width: "100%",
                height: { xs: "300px", sm: "400px", md: "500px" },
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Box
                component="img"
                src={destination.image}
                alt={destination.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = "/foundation-logo.png";
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to top, rgba(93, 64, 55, 0.85), rgba(255, 107, 53, 0.3), transparent)",
                  p: 3,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  {destination.title}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              {/* Key Information Chips */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  mb: 4,
                }}
              >
                <Chip
                  icon={<LocationOn />}
                  label={destination.location}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#FF6B35", // Warm orange
                    color: "white",
                    "& .MuiChip-icon": {
                      color: "white",
                    },
                  }}
                />
                <Chip
                  icon={<Schedule />}
                  label={`Duration: ${destination.duration}`}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: "#5D4037", // Dark brown
                    color: "#5D4037",
                    "& .MuiChip-icon": {
                      color: "#5D4037",
                    },
                  }}
                />
                <Chip
                  icon={<People />}
                  label={`Best Time: ${destination.bestTime}`}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: "#FF8C42", // Warm orange
                    color: "#5D4037",
                    "& .MuiChip-icon": {
                      color: "#FF8C42",
                    },
                  }}
                />
              </Box>

              {/* Description */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#5D4037", // Dark brown
                }}
              >
                About This Destination
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: "text.secondary",
                  mb: 4,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                }}
              >
                {destination.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  alignItems: "stretch",
                }}
              >
                {/* Wildlife Section */}
                <Card
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#FAF0E6", // Light beige
                    border: "1px solid #D4A574", // Warm brown border
                  }}
                >
                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: "#5D4037", // Dark brown
                      }}
                    >
                      Wildlife
                    </Typography>
                    <Chip
                      label={destination.wildlife}
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        backgroundColor: "#FF8C42", // Warm orange
                        color: "white",
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Highlights Section */}
                <Card
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#FAF0E6", // Light beige
                    border: "1px solid #D4A574", // Warm brown border
                  }}
                >
                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: "#5D4037", // Dark brown
                      }}
                    >
                      Highlights
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                      {destination.highlights.map((highlight, index) => (
                        <Typography
                          key={index}
                          component="li"
                          variant="body1"
                          sx={{
                            mb: 1,
                            color: "text.secondary",
                            lineHeight: 1.7,
                          }}
                        >
                          {highlight}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Call to Action */}
              <Box
                sx={{
                  mt: 4,
                  textAlign: "center",
                  p: 3,
                  background: "linear-gradient(135deg, #FF6B35, #FF8C42)", // Warm orange gradient
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "white",
                  }}
                >
                  Ready to Experience This Destination?
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "white",
                    color: "#5D4037", // Dark brown
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#FAF0E6", // Light beige
                      color: "#5D4037",
                    },
                  }}
                >
                  Book Your Safari
                </Button>
              </Box>
            </Box>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}


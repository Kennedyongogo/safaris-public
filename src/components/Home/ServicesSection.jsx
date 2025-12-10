import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Fade,
  Slide,
  Chip,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  School,
  Psychology,
  VolunteerActivism,
  LocalHospital,
  Group,
  EmojiPeople,
  ChevronLeft,
  ChevronRight,
  ArrowForward,
  Close as CloseIcon,
} from "@mui/icons-material";

// Category configuration mapping
const categoryConfig = {
  educational_support: {
    icon: School,
    color: "#2196f3",
    gradient: "linear-gradient(135deg, #2196f3, #21cbf3)",
  },
  mental_health_awareness: {
    icon: Psychology,
    color: "#e91e63",
    gradient: "linear-gradient(135deg, #e91e63, #f06292)",
  },
  poverty_alleviation: {
    icon: VolunteerActivism,
    color: "#4caf50",
    gradient: "linear-gradient(135deg, #4caf50, #81c784)",
  },
  community_empowerment: {
    icon: Group,
    color: "#ff9800",
    gradient: "linear-gradient(135deg, #ff9800, #ffb74d)",
  },
  healthcare_access: {
    icon: LocalHospital,
    color: "#9c27b0",
    gradient: "linear-gradient(135deg, #9c27b0, #ba68c8)",
  },
  youth_development: {
    icon: EmojiPeople,
    color: "#00bcd4",
    gradient: "linear-gradient(135deg, #00bcd4, #4dd0e1)",
  },
};

// Helper to build image URL
const buildImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("uploads/")) return `/${imagePath}`;
  if (imagePath.startsWith("/uploads/")) return imagePath;
  return imagePath;
};

// Mission Card Component
const MissionCard = ({
  category,
  config,
  IconComponent,
  isVisible,
  index,
  onViewMore,
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images from the category
  const getAllImages = () => {
    if (
      category.images &&
      Array.isArray(category.images) &&
      category.images.length > 0
    ) {
      return category.images
        .map((img) => {
          const path = typeof img === "object" ? img.path : img;
          return buildImageUrl(path);
        })
        .filter((url) => url); // Filter out empty URLs
    }
    return [];
  };

  const images = getAllImages();
  const hasMultipleImages = images.length > 1;
  const currentImageUrl = images.length > 0 ? images[currentImageIndex] : null;

  // Auto-transition images if there are multiple
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Slide direction="up" in={isVisible} timeout={800 + index * 200}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            },
          }}
          onClick={() => onViewMore(category)}
        >
          {/* Image Section - Fixed 200px height like news cards */}
          <Box
            sx={{
              position: "relative",
              height: 200,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {currentImageUrl && !imageError ? (
              <>
                {images.map((imageUrl, imgIndex) => {
                  const isActive = imgIndex === currentImageIndex;
                  return (
                    <Box
                      key={imgIndex}
                      component="img"
                      src={imageUrl}
                      alt={category.title}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.5s ease-in-out",
                      }}
                    />
                  );
                })}
                {hasMultipleImages && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 0.5,
                      zIndex: 3,
                    }}
                  >
                    {images.map((_, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          width: currentImageIndex === idx ? 20 : 6,
                          height: 6,
                          borderRadius: "3px",
                          backgroundColor:
                            currentImageIndex === idx
                              ? "white"
                              : "rgba(255, 255, 255, 0.5)",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </Box>
                )}
              </>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${config.color}05, ${config.color}02)`,
                }}
              >
                <IconComponent sx={{ fontSize: 80, color: config.color }} />
              </Box>
            )}
          </Box>

          <CardContent
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ mb: 1.5 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: "text.primary",
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {category.title}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.5,
                flexGrow: 1,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              {category.description}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForward />}
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                onViewMore(category);
              }}
              sx={{
                borderColor: config.color,
                color: config.color,
                fontSize: "0.875rem",
                py: 1,
                mt: "auto",
                "&:hover": {
                  borderColor: config.color,
                  backgroundColor: config.color,
                  color: "white",
                },
              }}
            >
              View More
            </Button>
          </CardContent>
        </Card>
      </Slide>
    </Grid>
  );
};

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [missionCategories, setMissionCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [missionDetails, setMissionDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Determine how many cards to show based on screen size
  const cardsToShow = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = Math.max(0, missionCategories.length - cardsToShow);

  useEffect(() => {
    setIsVisible(true);
    fetchMissionCategories();
  }, []);

  const fetchMissionCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/mission-categories/public");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setMissionCategories(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch mission categories");
      }
    } catch (err) {
      console.error("Error fetching mission categories:", err);
      setError(err.message);
      setMissionCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const getVisibleCategories = () => {
    return missionCategories.slice(currentIndex, currentIndex + cardsToShow);
  };

  const handleViewMore = async (category) => {
    setSelectedMission(category);
    setDialogOpen(true);
    setLoadingDetails(true);

    try {
      const response = await fetch(
        `/api/mission-categories/public/${category.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch mission details");
      }
      const data = await response.json();
      if (data.success && data.data) {
        setMissionDetails(data.data);
      } else {
        setMissionDetails(category); // Fallback to category data
      }
    } catch (err) {
      console.error("Error fetching mission details:", err);
      setMissionDetails(category); // Fallback to category data
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMission(null);
    setMissionDetails(null);
  };

  return (
    <Box
      id="mission-section"
      sx={{
        py: 6,
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.paper",
        background:
          "linear-gradient(135deg, rgba(240, 248, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 250, 252, 0.9) 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(33, 150, 243, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(233, 30, 99, 0.1) 0%, transparent 50%)",
          zIndex: 0,
        },
      }}
    >
      <Card
        sx={{
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  mb: 2,
                  fontWeight: 800,
                  fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
                  background:
                    "linear-gradient(45deg, #2196f3, #e91e63, #4caf50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "60px", sm: "70px", md: "80px" },
                    height: "4px",
                    background: "linear-gradient(45deg, #2196f3, #e91e63)",
                    borderRadius: "2px",
                  },
                }}
              >
                Safari Destinations
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  maxWidth: { xs: "100%", sm: "800px", md: "900px" },
                  mx: "auto",
                  px: { xs: 1, sm: 0 },
                  fontWeight: 500,
                  fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                  lineHeight: 1.6,
                  color: "text.primary",
                }}
              >
                Akira Safaris offers unforgettable wildlife experiences and
                safari adventures across Africa's most spectacular destinations.
                Discover the wild heart of Africa through our expertly crafted
                tours.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  flexWrap: "wrap",
                  mb: 3,
                  px: { xs: 1, sm: 0 },
                }}
              >
                <Chip
                  label="Wildlife Safaris"
                  sx={{
                    background: "linear-gradient(45deg, #2196f3, #21cbf3)",
                    color: "white",
                    fontWeight: 600,
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  }}
                />
                <Chip
                  label="Adventure Tours"
                  sx={{
                    background: "linear-gradient(45deg, #e91e63, #f06292)",
                    color: "white",
                    fontWeight: 600,
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  }}
                />
                <Chip
                  label="Nature Experiences"
                  sx={{
                    background: "linear-gradient(45deg, #4caf50, #81c784)",
                    color: "white",
                    fontWeight: 600,
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  }}
                />
              </Box>
            </Box>
          </Fade>

          <Box sx={{ position: "relative" }}>
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={8}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box textAlign="center" py={4}>
                <Typography color="error" variant="body1">
                  {error}
                </Typography>
              </Box>
            ) : missionCategories.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography color="text.secondary" variant="body1">
                  No mission categories available at the moment.
                </Typography>
              </Box>
            ) : (
              <Box>
                {/* Navigation Controls */}
                {missionCategories.length > cardsToShow && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <IconButton
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                        "&:disabled": {
                          backgroundColor: "grey.300",
                          color: "grey.500",
                        },
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>

                    <Typography variant="body1" color="text.secondary">
                      Showing {currentIndex + 1}-
                      {Math.min(
                        currentIndex + cardsToShow,
                        missionCategories.length
                      )}{" "}
                      of {missionCategories.length} categories
                    </Typography>

                    <IconButton
                      onClick={handleNext}
                      disabled={currentIndex >= maxIndex}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                        "&:disabled": {
                          backgroundColor: "grey.300",
                          color: "grey.500",
                        },
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </Box>
                )}

                {/* Mission Categories Grid */}
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2.5, md: 3 }}
                  justifyContent="center"
                >
                  {getVisibleCategories().map((category, index) => {
                    const config =
                      categoryConfig[category.category] ||
                      categoryConfig.educational_support;
                    const IconComponent = config.icon;

                    return (
                      <MissionCard
                        key={category.id || index}
                        category={category}
                        config={config}
                        IconComponent={IconComponent}
                        isVisible={isVisible}
                        index={currentIndex + index}
                        onViewMore={handleViewMore}
                      />
                    );
                  })}
                </Grid>

                {/* Page Indicators */}
                {missionCategories.length > cardsToShow && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      mt: 4,
                    }}
                  >
                    {Array.from({
                      length: Math.ceil(missionCategories.length / cardsToShow),
                    }).map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => setCurrentIndex(index * cardsToShow)}
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor:
                            Math.floor(currentIndex / cardsToShow) === index
                              ? "primary.main"
                              : "grey.300",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            backgroundColor: "primary.light",
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Card>

      {/* Mission Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "90vh",
          },
        }}
      >
        {missionDetails && (
          <>
            <DialogTitle
              sx={{
                background: (theme) => {
                  const config =
                    categoryConfig[missionDetails.category] ||
                    categoryConfig.educational_support;
                  return config.gradient;
                },
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {(() => {
                  const config =
                    categoryConfig[missionDetails.category] ||
                    categoryConfig.educational_support;
                  const IconComponent = config.icon;
                  return <IconComponent sx={{ fontSize: 32 }} />;
                })()}
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {missionDetails.title}
                </Typography>
              </Box>
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              {/* Images */}
              {missionDetails.images &&
                Array.isArray(missionDetails.images) &&
                missionDetails.images.length > 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "200px", sm: "300px" },
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={buildImageUrl(
                        typeof missionDetails.images[0] === "object"
                          ? missionDetails.images[0].path
                          : missionDetails.images[0]
                      )}
                      alt={missionDetails.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}

              <Box sx={{ p: 3 }}>
                {/* Impact Chip */}
                {missionDetails.impact && (
                  <Box
                    sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={missionDetails.impact}
                      sx={{
                        backgroundColor: (() => {
                          const config =
                            categoryConfig[missionDetails.category] ||
                            categoryConfig.educational_support;
                          return config.color;
                        })(),
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                )}

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.8,
                    color: "text.primary",
                    mb: 2,
                  }}
                >
                  {missionDetails.description}
                </Typography>

                {/* Additional Images Gallery */}
                {missionDetails.images &&
                  Array.isArray(missionDetails.images) &&
                  missionDetails.images.length > 1 && (
                    <>
                      <Box
                        sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}
                      >
                        <Typography variant="h6" gutterBottom>
                          More Images
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          {missionDetails.images
                            .slice(1)
                            .map((imageObj, index) => {
                              const imagePath =
                                typeof imageObj === "object"
                                  ? imageObj.path
                                  : imageObj;
                              return (
                                <Grid item xs={12} sm={6} key={index}>
                                  <img
                                    src={buildImageUrl(imagePath)}
                                    alt={`${missionDetails.title} - Image ${index + 2}`}
                                    style={{
                                      width: "100%",
                                      height: "200px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </Grid>
                              );
                            })}
                        </Grid>
                      </Box>
                    </>
                  )}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
              <Button
                onClick={handleCloseDialog}
                variant="contained"
                sx={{
                  background: (() => {
                    const config =
                      categoryConfig[missionDetails.category] ||
                      categoryConfig.educational_support;
                    return config.gradient;
                  })(),
                  color: "white",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
        {loadingDetails && (
          <DialogContent
            sx={{ display: "flex", justifyContent: "center", py: 8 }}
          >
            <CircularProgress />
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}

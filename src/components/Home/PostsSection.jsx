import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Paper,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Article as NewsIcon,
  Event as EventIcon,
  ChevronLeft,
  ChevronRight,
  CalendarToday,
  LocationOn,
  ArrowForward,
  Close as CloseIcon,
} from "@mui/icons-material";

const MotionBox = motion(Box);

const buildImageUrl = (imageUrl) => {
  if (!imageUrl) return "/foundation-logo.png";
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("uploads/")) return `/${imageUrl}`;
  if (imageUrl.startsWith("/uploads/")) return imageUrl;
  return imageUrl;
};

const getPostImage = (post) => {
  if (post.type === "news" && post.images && Array.isArray(post.images) && post.images.length > 0) {
    const firstImage = post.images[0];
    const path = typeof firstImage === 'object' ? firstImage.path : firstImage;
    return buildImageUrl(path);
  }
  if (post.type === "event" && post.banner) {
    return buildImageUrl(post.banner);
  }
  return "/foundation-logo.png";
};

const getAllNewsImages = (post) => {
  if (post.type === "news" && post.images && Array.isArray(post.images) && post.images.length > 0) {
    return post.images.map((img) => {
      const path = typeof img === 'object' ? img.path : img;
      return buildImageUrl(path);
    }).filter(url => url);
  }
  return [];
};

const getStatusColor = (status, type) => {
  if (type === "news") {
    const colors = {
      draft: "#9e9e9e",
      published: "#4caf50",
      archived: "#757575",
    };
    return colors[status] || "#667eea";
  } else {
    const colors = {
      upcoming: "#2196f3",
      ongoing: "#ff9800",
      completed: "#4caf50",
      cancelled: "#f44336",
    };
    return colors[status] || "#667eea";
  }
};

const getStatusLabel = (status, type) => {
  if (type === "news") {
    const labels = {
      draft: "Draft",
      published: "Published",
      archived: "Archived",
    };
    return labels[status] || status;
  } else {
    const labels = {
      upcoming: "Upcoming",
      ongoing: "Ongoing",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return labels[status] || status;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function PostsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageIndices, setImageIndices] = useState(new Map());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    fetchPosts();
  }, []);

  // Auto-transition images for news items with multiple images
  useEffect(() => {
    const newsPosts = posts.filter(post => post.type === "news");
    const postsWithMultipleImages = newsPosts.filter(post => {
      const images = getAllNewsImages(post);
      return images.length > 1;
    });

    if (postsWithMultipleImages.length === 0) return;

    const interval = setInterval(() => {
      setImageIndices(prev => {
        const newMap = new Map(prev);
        postsWithMultipleImages.forEach(post => {
          const images = getAllNewsImages(post);
          const currentIndex = newMap.get(post.id) || 0;
          const nextIndex = (currentIndex + 1) % images.length;
          newMap.set(post.id, nextIndex);
        });
        return newMap;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [posts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/posts/public?limit=50");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();

      if (data.success && data.data) {
        setPosts(data.data);
      } else {
        setPosts([]);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 0) return post.type === "news";
    return post.type === "event";
  });

  const scrollContainerRef = React.useRef(null);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [filteredPosts]);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = isMobile ? 300 : isTablet ? 400 : 500;
    const currentScroll = container.scrollLeft;
    const newPosition =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPost(null);
  };

  return (
    <Box
      id="posts-section"
      sx={{
        py: { xs: 4, md: 6 },
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(14, 141, 69, 0.05) 0%, transparent 50%)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <Box sx={{ p: { xs: 3, md: 6 } }}>
              {/* Header */}
              <Box
                sx={{
                  textAlign: "center",
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <NewsIcon sx={{ fontSize: "2.5rem", color: "primary.main" }} />
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" },
                    }}
                  >
                    News & Events
                  </Typography>
                  <EventIcon sx={{ fontSize: "2.5rem", color: "primary.main" }} />
                </Box>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: 600, mx: "auto", fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Stay updated with our latest news and upcoming events
                </Typography>
              </Box>

              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant={isLargeScreen ? "fullWidth" : "standard"}
                  centered={!isLargeScreen}
                  sx={{
                    "& .MuiTab-root": {
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      fontWeight: 600,
                      textTransform: "none",
                      minWidth: { xs: 100, sm: 150 },
                      "&:focus": {
                        outline: "none",
                        backgroundColor: "transparent",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        backgroundColor: "transparent",
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "transparent",
                      },
                    },
                    "& .Mui-selected": {
                      color: "primary.main",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "primary.main",
                      height: 3,
                    },
                  }}
                >
                  <Tab
                    icon={<NewsIcon />}
                    iconPosition="start"
                    label="News"
                    disableRipple
                    sx={{ 
                      gap: 1,
                      "&:focus": {
                        outline: "none",
                        backgroundColor: "transparent",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        backgroundColor: "transparent",
                      },
                    }}
                  />
                  <Tab
                    icon={<EventIcon />}
                    iconPosition="start"
                    label="Events"
                    disableRipple
                    sx={{ 
                      gap: 1,
                      "&:focus": {
                        outline: "none",
                        backgroundColor: "transparent",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        backgroundColor: "transparent",
                      },
                    }}
                  />
                </Tabs>
              </Box>

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress size={50} />
                </Box>
              ) : error ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              ) : filteredPosts.length === 0 ? (
                <Alert severity="info" sx={{ mb: 3 }}>
                  No {activeTab === 0 ? "news" : "events"} available at the moment.
                </Alert>
              ) : (
                <Box>
                  {/* Scroll Container */}
                  <Box
                    sx={{
                      position: "relative",
                      mb: 3,
                    }}
                  >
                    {/* Left Scroll Button */}
                    {showLeftButton && (
                      <IconButton
                        onClick={() => handleScroll("left")}
                        sx={{
                          position: "absolute",
                          left: { xs: -10, sm: -20 },
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 2,
                          backgroundColor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <ChevronLeft />
                      </IconButton>
                    )}

                    {/* Right Scroll Button */}
                    {showRightButton && (
                      <IconButton
                        onClick={() => handleScroll("right")}
                        sx={{
                          position: "absolute",
                          right: { xs: -10, sm: -20 },
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 2,
                          backgroundColor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    )}

                    {/* Horizontal Scroll Container */}
                    <Box
                      ref={scrollContainerRef}
                      sx={{
                        display: "flex",
                        gap: 3,
                        overflowX: "auto",
                        overflowY: "hidden",
                        scrollBehavior: "smooth",
                        scrollbarWidth: "thin",
                        scrollbarColor: `${theme.palette.primary.main} transparent`,
                        "&::-webkit-scrollbar": {
                          height: 8,
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "rgba(0,0,0,0.05)",
                          borderRadius: 4,
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: 4,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        },
                        pb: 2,
                        px: { xs: 1, sm: 2 },
                      }}
                    >
                      {filteredPosts.map((post, index) => (
                        <MotionBox
                          key={post.id}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          sx={{
                            minWidth: { xs: "280px", sm: "320px", md: "360px" },
                            maxWidth: { xs: "280px", sm: "320px", md: "360px" },
                            flexShrink: 0,
                          }}
                        >
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
                            onClick={() => handleViewPost(post)}
                          >
                            {post.type === "news" ? (
                              <Box
                                sx={{
                                  position: "relative",
                                  height: 200,
                                  overflow: "hidden",
                                  flexShrink: 0,
                                }}
                              >
                                {getAllNewsImages(post).map((imageUrl, imgIndex) => {
                                  const currentIndex = imageIndices.get(post.id) || 0;
                                  const isActive = imgIndex === currentIndex;
                                  return (
                                    <Box
                                      key={imgIndex}
                                      component="img"
                                      src={imageUrl}
                                      alt={post.title}
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
                                {getAllNewsImages(post).length === 0 && (
                                  <Box
                                    component="img"
                                    src="/foundation-logo.png"
                                    alt={post.title}
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                            ) : (
                              <CardMedia
                                component="img"
                                height={200}
                                image={getPostImage(post)}
                                alt={post.title}
                                sx={{
                                  objectFit: "cover",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                            <CardContent
                              sx={{
                                flexGrow: 1,
                                p: { xs: 2, sm: 3 },
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Box sx={{ mb: 1.5 }}>
                                <Chip
                                  label={getStatusLabel(post.status, post.type)}
                                  size="small"
                                  sx={{
                                    backgroundColor: getStatusColor(post.status, post.type),
                                    color: "white",
                                    fontWeight: 600,
                                    mb: 1,
                                  }}
                                />
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
                                  {post.title}
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
                                {post.content}
                              </Typography>

                              {post.type === "event" && (
                                <Box sx={{ mb: 2 }}>
                                  {post.start_date && (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        mb: 0.5,
                                      }}
                                    >
                                      <CalendarToday
                                        sx={{ fontSize: 14, color: "primary.main" }}
                                      />
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontSize: "0.75rem" }}
                                      >
                                        {formatDate(post.start_date)}
                                        {post.end_date && ` - ${formatDate(post.end_date)}`}
                                      </Typography>
                                    </Box>
                                  )}
                                  {post.location && (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                      }}
                                    >
                                      <LocationOn
                                        sx={{ fontSize: 14, color: "primary.main" }}
                                      />
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontSize: "0.75rem" }}
                                      >
                                        {post.location}
                                      </Typography>
                                    </Box>
                                  )}
                                </Box>
                              )}

                              <Button
                                variant="outlined"
                                size="small"
                                endIcon={<ArrowForward />}
                                fullWidth
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewPost(post);
                                }}
                                sx={{
                                  borderColor: "primary.main",
                                  color: "primary.main",
                                  fontSize: "0.875rem",
                                  py: 1,
                                  mt: "auto",
                                  "&:hover": {
                                    borderColor: "primary.dark",
                                    backgroundColor: "primary.light",
                                    color: "white",
                                  },
                                }}
                              >
                                Read More
                              </Button>
                            </CardContent>
                          </Card>
                        </MotionBox>
                      ))}
                    </Box>
                  </Box>

                  {/* Scroll Indicator */}
                  {filteredPosts.length > 3 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Scroll horizontally to see more {activeTab === 0 ? "news" : "events"}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </MotionBox>
      </Container>

      {/* Post Detail Dialog */}
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
        {selectedPost && (
          <>
            <DialogTitle
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {selectedPost.type === "news" ? (
                  <NewsIcon sx={{ fontSize: 32 }} />
                ) : (
                  <EventIcon sx={{ fontSize: 32 }} />
                )}
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {selectedPost.title}
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
              {/* Banner/Image */}
              {(selectedPost.type === "news" && selectedPost.images && selectedPost.images.length > 0) ||
              (selectedPost.type === "event" && selectedPost.banner) ? (
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "200px", sm: "300px" },
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={getPostImage(selectedPost)}
                    alt={selectedPost.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ) : null}

              <Box sx={{ p: 3 }}>
                {/* Status and Type Chips */}
                <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                  <Chip
                    label={selectedPost.type === "news" ? "News" : "Event"}
                    sx={{
                      backgroundColor: selectedPost.type === "news" ? "#2196f3" : "#ff9800",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={getStatusLabel(selectedPost.status, selectedPost.type)}
                    sx={{
                      backgroundColor: getStatusColor(selectedPost.status, selectedPost.type),
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {/* Event Details */}
                {selectedPost.type === "event" && (
                  <Box sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                    {selectedPost.start_date && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <CalendarToday sx={{ color: "primary.main" }} />
                        <Typography variant="body1" fontWeight="600">
                          {formatDate(selectedPost.start_date)}
                          {selectedPost.end_date && ` - ${formatDate(selectedPost.end_date)}`}
                        </Typography>
                      </Box>
                    )}
                    {selectedPost.location && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocationOn sx={{ color: "primary.main" }} />
                        <Typography variant="body1" fontWeight="600">
                          {selectedPost.location}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Content */}
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.8,
                    color: "text.primary",
                    mb: 2,
                  }}
                >
                  {selectedPost.content}
                </Typography>

                {/* News Images Gallery */}
                {selectedPost.type === "news" &&
                  selectedPost.images &&
                  Array.isArray(selectedPost.images) &&
                  selectedPost.images.length > 1 && (
                    <>
                      <Divider sx={{ my: 3 }} />
                      <Typography variant="h6" gutterBottom>
                        More Images
                      </Typography>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        {selectedPost.images.slice(1).map((imageObj, index) => {
                          const imagePath =
                            typeof imageObj === "object" ? imageObj.path : imageObj;
                          return (
                            <Grid item xs={12} sm={6} key={index}>
                              <img
                                src={buildImageUrl(imagePath)}
                                alt={`${selectedPost.title} - Image ${index + 2}`}
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
                    </>
                  )}

                {/* Date Info */}
                <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                  <Typography variant="caption" color="text.secondary">
                    Published: {formatDate(selectedPost.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
              <Button
                onClick={handleCloseDialog}
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}


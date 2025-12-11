import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

// Hardcoded team members data
const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Owner",
    position: "CEO & Founder",
    description: "John's extensive experience as a safari guide sets him apart from the rest, organising your ideal trip.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Director",
    position: "Chief Operating Officer",
    description: "Sarah's passion for wildlife and customer service ensures every safari experience exceeds expectations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Manager",
    position: "Head of Operations",
    description: "Michael's operational expertise keeps our safaris running smoothly and safely for all guests.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Manager",
    position: "Marketing Director",
    description: "Emily brings our safari stories to life, connecting travelers with unforgettable African adventures.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Expert",
    position: "Safari Guide Expert",
    description: "David's extensive knowledge of wildlife and local culture makes every safari an educational journey.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Manager",
    position: "Customer Relations Manager",
    description: "Lisa ensures every guest feels valued and supported throughout their safari experience with us.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
];

export default function Team() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 200px)",
        py: { xs: 3, sm: 4, md: 5 },
        background: "linear-gradient(135deg, rgba(240, 248, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 250, 252, 0.9) 100%)",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 1.5, md: 1.5 } }}>
        <Paper
          elevation={3}
          sx={{
            py: { xs: 1.5, sm: 2, md: 2.5 },
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            borderRadius: { xs: 3, md: 4 },
            background: "white",
            border: "1px solid #e0e0e0",
          }}
        >
          {/* Page Title */}
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4, md: 5 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#5D4037",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.125rem" },
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Get to know the passionate individuals who make Akira Safaris an
              unforgettable experience.
            </Typography>
          </Box>

          {/* Team Members Grid - 3 cards per row */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
            {teamMembers.map((member) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {/* Profile Image */}
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "300px", sm: "350px", md: "400px" },
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    {member.image ? (
                      <Box
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <Box
                      sx={{
                        display: member.image ? "none" : "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        color: "#999",
                      }}
                    >
                      <PersonIcon sx={{ fontSize: "4rem", mb: 1 }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.9rem",
                          textAlign: "center",
                          fontWeight: 600,
                        }}
                      >
                        No Photo
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card Content - Purple/Lavender Background */}
                  <Box
                    sx={{
                      backgroundColor: "#E8D5FF", // Light purple/lavender
                      p: { xs: 2, sm: 2.5, md: 3 },
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Top Section - Role, Name, Description */}
                    <Box>
                      {/* Role Label */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.875rem", md: "0.9375rem" },
                          color: "text.primary",
                          mb: 0.5,
                        }}
                      >
                        {member.role}
                      </Typography>

                      {/* Name */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          color: "text.primary",
                          fontSize: { xs: "1.25rem", md: "1.5rem" },
                        }}
                      >
                        {member.name}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", md: "0.9375rem" },
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {member.description}
                      </Typography>
                    </Box>

                    {/* Bottom Section - Social Icons and Button */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: "auto",
                      }}
                    >
                      {/* Social Media Icons */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#000",
                            color: "#fff",
                            width: 32,
                            height: 32,
                            "&:hover": {
                              backgroundColor: "#333",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add Facebook link here
                          }}
                        >
                          <FacebookIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#000",
                            color: "#fff",
                            width: 32,
                            height: 32,
                            "&:hover": {
                              backgroundColor: "#333",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add Instagram link here
                          }}
                        >
                          <InstagramIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                      </Box>

                      {/* More About Button */}
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/team/${member.id}`);
                        }}
                        sx={{
                          backgroundColor: "#8B4513", // Reddish-brown
                          color: "#fff",
                          borderRadius: 2,
                          px: 2,
                          py: 0.75,
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
                          textTransform: "none",
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: "#A0522D",
                          },
                          "&:focus": {
                            outline: "none",
                          },
                          "&:focus-visible": {
                            outline: "none",
                            boxShadow: "none",
                          },
                        }}
                      >
                        More about {member.name.split(" ")[0]}
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}


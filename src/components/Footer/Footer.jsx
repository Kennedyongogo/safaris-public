import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Chip,
  Divider,
  Fade,
  Slide,
  Paper,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "transparent",
        pt: { xs: 0.25, sm: 0.375, md: 0.5 },
        pb: 1,
        mt: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: 0,
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
          <Fade in timeout={1000}>
            <Box>
              <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 5 }}
                justifyContent="space-between"
              >
                <Grid item xs={12} md={4}>
                  <Slide direction="up" in timeout={1200}>
                    <Box sx={{ textAlign: "left" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1, sm: 2 },
                          mb: { xs: 1, sm: 1.5 },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: "-4px",
                              left: "-4px",
                              right: "-4px",
                              bottom: "-4px",
                              background:
                                "linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                              borderRadius: "50%",
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                            },
                            "&:hover::before": {
                              opacity: 1,
                            },
                          }}
                        >
                          <img
                            src="/dave.png"
                            alt="Akira Safaris Logo"
                            style={{
                              height: "32px",
                              width: "auto",
                              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            background:
                              "linear-gradient(45deg, #2196f3, #1976d2)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: { xs: "1.1rem", sm: "1.5rem" },
                          }}
                        >
                          Akira Safaris
                        </Typography>
                      </Box>

                      <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: { xs: 0.5, sm: 1 },
                            fontWeight: 600,
                            color: "#ff9800",
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                          }}
                        >
                          Experience the Magic of Africa.
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 0.5,
                            lineHeight: 1.6,
                            color: "text.primary",
                            fontSize: { xs: "0.8rem", sm: "1rem" },
                          }}
                        >
                          Akira Safaris opens the door to Africa's awe-inspiring
                          beauty,
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: { xs: 1, sm: 1.5 },
                            lineHeight: 1.6,
                            color: "text.primary",
                            fontSize: { xs: "0.8rem", sm: "1rem" },
                          }}
                        >
                          wonders, and hidden treasures. Creating transformative
                          journeys across this extraordinary continent.
                        </Typography>
                      </Box>

                      {/* Mission Chips */}
                      <Box
                        sx={{
                          mb: { xs: 1, sm: 2 },
                          display: "flex",
                          flexWrap: "wrap",
                          gap: { xs: 0.5, sm: 1 },
                        }}
                      >
                        <Chip
                          label="Wildlife"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #4caf50, #66bb6a)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)",
                            },
                          }}
                        />
                        <Chip
                          label="Adventure"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #e91e63, #f06292)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(233, 30, 99, 0.4)",
                            },
                          }}
                        />
                        <Chip
                          label="Safari Tours"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #ff9800, #ffb74d)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(255, 152, 0, 0.4)",
                            },
                          }}
                        />
                      </Box>

                      {/* Social Media Icons */}
                      <Typography
                        variant="h6"
                        sx={{
                          mb: { xs: 0.5, sm: 1 },
                          fontWeight: 600,
                          color: "text.primary",
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        Follow Us
                      </Typography>
                      <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
                        {[
                          {
                            icon: <Facebook />,
                            color: "#1877f2",
                            label: "Facebook",
                          },
                          {
                            icon: <Twitter />,
                            color: "#1da1f2",
                            label: "Twitter",
                          },
                          {
                            icon: <Instagram />,
                            color: "#e4405f",
                            label: "Instagram",
                          },
                          {
                            icon: <LinkedIn />,
                            color: "#0077b5",
                            label: "LinkedIn",
                          },
                        ].map((social, index) => (
                          <IconButton
                            key={index}
                            aria-label={social.label}
                            sx={{
                              color: social.color,
                              background: "rgba(0,0,0,0.05)",
                              border: "1px solid rgba(0,0,0,0.1)",
                              transition:
                                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              "&:hover": {
                                background: social.color,
                                color: "white",
                                transform: "translateY(-3px) scale(1.1)",
                                boxShadow: `0 8px 25px ${social.color}40`,
                              },
                            }}
                          >
                            {social.icon}
                          </IconButton>
                        ))}
                      </Box>
                    </Box>
                  </Slide>
                </Grid>

                <Grid item xs={12} md={8}>
                  {/* Contact Us Column */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box sx={{ ml: "auto" }}>
                      <Slide direction="up" in timeout={1600}>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            variant="h5"
                            sx={{
                              mb: { xs: 1, sm: 1.5 },
                              fontWeight: 700,
                              background:
                                "linear-gradient(45deg, #2196f3, #1976d2)",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              fontSize: { xs: "1.3rem", sm: "1.5rem" },
                              textAlign: "right",
                            }}
                          >
                            Contact Us
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: { xs: 0.5, sm: 0.75 },
                              alignItems: "flex-end",
                            }}
                          >
                            {/* Physical Address */}
                            <Box
                              sx={{
                                p: { xs: 1, sm: 1.25 },
                                background: "rgba(0,0,0,0.03)",
                                border: "1px solid rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                                transition: "all 0.3s ease",
                                textAlign: "right",
                                "&:hover": {
                                  background: "rgba(0,0,0,0.05)",
                                  transform: "translateY(-1px)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 0.5, sm: 1 },
                                  mb: { xs: 0.25, sm: 0.5 },
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#4caf50",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: 24, sm: 28 },
                                    height: { xs: 24, sm: 28 },
                                    borderRadius: "50%",
                                    background: "rgba(76, 175, 80, 0.1)",
                                  }}
                                >
                                  <LocationOn
                                    sx={{
                                      fontSize: { xs: "14px", sm: "16px" },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                  }}
                                >
                                  Physical Address
                                </Typography>
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.primary",
                                  lineHeight: 1.4,
                                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                  textAlign: "right",
                                }}
                              >
                                Meghon Plaza, Bungoma Town,
                                <br />
                                along Moi Avenue
                              </Typography>
                            </Box>

                            {/* Postal Address */}
                            <Box
                              sx={{
                                p: { xs: 1, sm: 1.25 },
                                background: "rgba(0,0,0,0.03)",
                                border: "1px solid rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                                transition: "all 0.3s ease",
                                textAlign: "right",
                                "&:hover": {
                                  background: "rgba(0,0,0,0.05)",
                                  transform: "translateY(-1px)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 0.5, sm: 1 },
                                  mb: { xs: 0.25, sm: 0.5 },
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#ff9800",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: 24, sm: 28 },
                                    height: { xs: 24, sm: 28 },
                                    borderRadius: "50%",
                                    background: "rgba(255, 152, 0, 0.1)",
                                  }}
                                >
                                  <LocationOn
                                    sx={{
                                      fontSize: { xs: "14px", sm: "16px" },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                  }}
                                >
                                  Postal Address
                                </Typography>
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.primary",
                                  lineHeight: 1.4,
                                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                  textAlign: "right",
                                }}
                              >
                                P.O. Box 2072-50200
                              </Typography>
                            </Box>

                            {/* Contact Info */}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: { xs: 0.5, sm: 1 },
                                alignItems: "flex-end",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 0.5, sm: 1 },
                                  flexDirection: "row-reverse",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#2196f3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: 20, sm: 24 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: "50%",
                                    background: "rgba(33, 150, 243, 0.1)",
                                  }}
                                >
                                  <Phone
                                    sx={{
                                      fontSize: { xs: "12px", sm: "14px" },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                  }}
                                >
                                  +254 731 913293
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 0.5, sm: 1 },
                                  flexDirection: "row-reverse",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#e91e63",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: 20, sm: 24 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: "50%",
                                    background: "rgba(233, 30, 99, 0.1)",
                                  }}
                                >
                                  <Email
                                    sx={{
                                      fontSize: { xs: "12px", sm: "14px" },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                  }}
                                >
                                  david@akirasafaris.co.ke
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Slide>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Copyright Section */}
              <Fade in timeout={2000}>
                <Box>
                  <Divider
                    sx={{
                      my: 1,
                      borderColor: "rgba(255,255,255,0.2)",
                      "&::before, &::after": {
                        borderColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      py: 1,
                      color: "text.primary",
                      fontWeight: 500,
                      fontSize: { xs: "0.75rem", sm: "1rem" },
                    }}
                  >
                    © {new Date().getFullYear()} Akira Safaris. All rights
                    reserved.
                  </Typography>
                  <Box
                    sx={{
                      mt: 0.5,
                      py: { xs: 0.5, sm: 0.75 },
                      px: { xs: 1, sm: 1.5 },
                      background: "rgba(212, 175, 55, 0.2)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      borderRadius: "12px",
                      textAlign: "center",
                      width: "30%",
                      mx: "auto",
                      boxShadow: "0 8px 32px rgba(212, 175, 55, 0.3)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontWeight: 700,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      developed by Carlvyne Technologies ltd
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Fade>
        </Paper>
      </Container>
    </Box>
  );
}

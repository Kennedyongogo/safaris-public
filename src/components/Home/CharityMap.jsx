import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  Tabs,
  Tab,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CircularProgress,
  Backdrop,
  Tooltip,
  Checkbox,
  Fade,
  Collapse,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls, ScaleLine, ZoomSlider } from "ol/control";
import XYZ from "ol/source/XYZ";
import MapIcon from "@mui/icons-material/Map";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import TerrainIcon from "@mui/icons-material/Terrain";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

// Lodge categories
const LODGE_CATEGORIES = {
  luxury: { label: "Luxury Lodges", color: "#d4af37" },
  tented: { label: "Tented Camps", color: "#8b4513" },
  eco: { label: "Eco Lodges", color: "#4caf50" },
  boutique: { label: "Boutique Lodges", color: "#9c27b0" },
  family: { label: "Family Friendly", color: "#2196f3" },
  romantic: { label: "Romantic Getaways", color: "#e91e63" },
};

// Dummy lodge data
const DUMMY_LODGES = [
  {
    id: 1,
    name: "Serengeti Luxury Camp",
    category: "luxury",
    latitude: -2.1540,
    longitude: 34.6857,
    description: "Experience the ultimate luxury safari in the heart of Serengeti",
    rating: 5,
    price: "$800/night",
    location: "Serengeti National Park, Tanzania",
  },
  {
    id: 2,
    name: "Maasai Mara Tented Camp",
    category: "tented",
    latitude: -1.4069,
    longitude: 35.0111,
    description: "Authentic tented camp experience with stunning wildlife views",
    rating: 4.5,
    price: "$450/night",
    location: "Maasai Mara, Kenya",
  },
  {
    id: 3,
    name: "Amboseli Eco Lodge",
    category: "eco",
    latitude: -2.6531,
    longitude: 37.2631,
    description: "Sustainable eco-lodge with breathtaking views of Mount Kilimanjaro",
    rating: 4.8,
    price: "$350/night",
    location: "Amboseli National Park, Kenya",
  },
  {
    id: 4,
    name: "Ngorongoro Boutique Lodge",
    category: "boutique",
    latitude: -3.1833,
    longitude: 35.5500,
    description: "Intimate boutique lodge overlooking the Ngorongoro Crater",
    rating: 5,
    price: "$650/night",
    location: "Ngorongoro Conservation Area, Tanzania",
  },
  {
    id: 5,
    name: "Samburu Family Safari Lodge",
    category: "family",
    latitude: 0.5167,
    longitude: 37.5333,
    description: "Perfect for families with kids' programs and family-friendly activities",
    rating: 4.7,
    price: "$400/night",
    location: "Samburu National Reserve, Kenya",
  },
  {
    id: 6,
    name: "Lake Nakuru Romantic Retreat",
    category: "romantic",
    latitude: -0.3667,
    longitude: 36.0833,
    description: "Intimate romantic getaway with private dining and spa services",
    rating: 4.9,
    price: "$550/night",
    location: "Lake Nakuru National Park, Kenya",
  },
  {
    id: 7,
    name: "Tsavo Luxury Safari Lodge",
    category: "luxury",
    latitude: -2.9833,
    longitude: 38.4667,
    description: "World-class luxury accommodation in the heart of Tsavo",
    rating: 5,
    price: "$750/night",
    location: "Tsavo National Park, Kenya",
  },
  {
    id: 8,
    name: "Kruger Tented Experience",
    category: "tented",
    latitude: -24.0115,
    longitude: 31.4857,
    description: "Authentic African tented camp in the famous Kruger National Park",
    rating: 4.6,
    price: "$420/night",
    location: "Kruger National Park, South Africa",
  },
  {
    id: 9,
    name: "Okavango Delta Eco Camp",
    category: "eco",
    latitude: -19.2667,
    longitude: 22.7333,
    description: "Sustainable eco-camp in the pristine Okavango Delta",
    rating: 4.8,
    price: "$380/night",
    location: "Okavango Delta, Botswana",
  },
  {
    id: 10,
    name: "Victoria Falls Boutique Lodge",
    category: "boutique",
    latitude: -17.9243,
    longitude: 25.8572,
    description: "Charming boutique lodge with views of the magnificent Victoria Falls",
    rating: 4.9,
    price: "$600/night",
    location: "Victoria Falls, Zimbabwe",
  },
];

const CharityMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [baseLayer, setBaseLayer] = useState("osm");
  const [showMarker, setShowMarker] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const vectorLayerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tileLoadError, setTileLoadError] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [lodges, setLodges] = useState(DUMMY_LODGES);
  const [selectedLodgeDetails, setSelectedLodgeDetails] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });
  const [visibleCategories, setVisibleCategories] = useState({
    luxury: true,
    tented: true,
    eco: true,
    boutique: true,
    family: true,
    romantic: true,
  });

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Geolocation states
  const [userLocation, setUserLocation] = useState(null);
  const [nearMeMode, setNearMeMode] = useState(false);
  const [nearMeRadius, setNearMeRadius] = useState(10); // km
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [nearMeResults, setNearMeResults] = useState([]);

  // Use proxy path instead of direct API URL
  const API_BASE_URL = "/api";

  // Distance calculation utility (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setIsGettingLocation(false);
        setLocationError(null);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  // Find lodges near user location
  const findNearMeProjects = () => {
    if (!userLocation) {
      getUserLocation();
      return;
    }

    const dataToSearch = searchResults.length > 0 ? searchResults : lodges;
    const nearbyLodges = dataToSearch
      .filter(
        (lodge) =>
          lodge.longitude !== null && lodge.latitude !== null
      )
      .map((lodge) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          parseFloat(lodge.latitude),
          parseFloat(lodge.longitude)
        );
        return { ...lodge, distance };
      })
      .filter((lodge) => lodge.distance <= nearMeRadius)
      .sort((a, b) => a.distance - b.distance);

    setNearMeResults(nearbyLodges);
    setNearMeMode(true);
  };

  // Center map on user location
  const centerOnUserLocation = () => {
    if (userLocation && mapInstance.current) {
      const map = mapInstance.current;
      const view = map.getView();
      view.setCenter(
        fromLonLat([userLocation.longitude, userLocation.latitude])
      );
      view.setZoom(12);
    }
  };

  // Create map instance only once
  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      const osmLayer = new TileLayer({
        source: new OSM({
          preload: 4,
          crossOrigin: "anonymous",
        }),
        visible: true,
        title: "osm",
        opacity: 1,
        zIndex: 0,
      });

      const satelliteLayer = new TileLayer({
        source: new XYZ({
          url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
          maxZoom: 20,
          attributions: "© Google Maps",
          preload: 4,
          crossOrigin: "anonymous",
        }),
        visible: false,
        title: "satellite",
        opacity: 1,
        zIndex: 0,
      });

      const terrainLayer = new TileLayer({
        source: new XYZ({
          url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
          maxZoom: 24,
          preload: 4,
          crossOrigin: "anonymous",
        }),
        visible: false,
        title: "terrain",
        opacity: 1,
        zIndex: 0,
      });

      // Create vector source and layer for projects
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        visible: showMarker,
      });
      vectorLayerRef.current = vectorLayer;

      const map = new Map({
        target: mapRef.current,
        layers: [osmLayer, satelliteLayer, terrainLayer, vectorLayer],
        view: new View({
          center: fromLonLat([25, -5]), // Center on Africa
          zoom: 5, // View to see lodges across Africa
        }),
        controls: defaultControls().extend([new ScaleLine(), new ZoomSlider()]),
      });

      // Click interaction will be handled in the application-specific useEffect

      mapInstance.current = map;
      setMapInitialized(true);
    }
    // Cleanup only on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
    };
  }, []);

  // Removed hospital fetching - focusing only on applications

  // Removed hospital markers - focusing only on applications

  // Update marker visibility when showMarker changes
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    if (vectorLayerRef.current) {
      vectorLayerRef.current.setVisible(showMarker);
    }
  }, [showMarker, mapInitialized]);

  // Search lodges function
  const searchProjects = async (query, column) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      // Filter lodges based on search query
      let filteredLodges = lodges;
      
      if (query.trim()) {
        const searchLower = query.toLowerCase();
        filteredLodges = lodges.filter((lodge) => {
          if (column === "all") {
            return (
              lodge.name.toLowerCase().includes(searchLower) ||
              lodge.location.toLowerCase().includes(searchLower) ||
              lodge.category.toLowerCase().includes(searchLower) ||
              lodge.description.toLowerCase().includes(searchLower)
            );
          } else if (column === "name") {
            return lodge.name.toLowerCase().includes(searchLower);
          } else if (column === "location") {
            return lodge.location.toLowerCase().includes(searchLower);
          } else if (column === "category") {
            return lodge.category.toLowerCase().includes(searchLower);
          } else if (column === "description") {
            return lodge.description.toLowerCase().includes(searchLower);
          }
          return true;
        });
      }

      setSearchResults(filteredLodges);
      return filteredLodges;
    } catch (error) {
      console.error("Error searching lodges:", error);
      setSearchError(error.message);
      setSearchResults([]);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  // Initialize lodges (using dummy data)
  useEffect(() => {
    setIsLoading(false);
    setLodges(DUMMY_LODGES);
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProjects(searchQuery, searchColumn);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchColumn]);

  // Auto-zoom to search results when search results change
  useEffect(() => {
    if (searchResults.length > 0 && mapInstance.current && mapInitialized) {
      const map = mapInstance.current;
      const view = map.getView();

      // Calculate bounds for all search results
      const coordinates = searchResults
        .filter((lodge) => lodge.longitude && lodge.latitude)
        .map((lodge) => [
          parseFloat(lodge.longitude),
          parseFloat(lodge.latitude),
        ]);

      if (coordinates.length > 0) {
        if (coordinates.length === 1) {
          // Single result - zoom to it
          view.setCenter(fromLonLat(coordinates[0]));
          view.setZoom(15);
        } else {
          // Multiple results - fit all in view
          const extent = coordinates.reduce(
            (extent, coord) => {
              const [lon, lat] = coord;
              return [
                Math.min(extent[0], lon),
                Math.min(extent[1], lat),
                Math.max(extent[2], lon),
                Math.max(extent[3], lat),
              ];
            },
            [Infinity, Infinity, -Infinity, -Infinity]
          );

          // Add some padding to the extent
          const padding = 0.01; // degrees
          const paddedExtent = [
            extent[0] - padding,
            extent[1] - padding,
            extent[2] + padding,
            extent[3] + padding,
          ];

          view.fit(fromLonLat(paddedExtent), {
            padding: [50, 50, 50, 50],
            duration: 1000,
          });
        }
      }
    }
  }, [searchResults, mapInitialized]);

  // Auto-update near me results when radius changes
  useEffect(() => {
    if (nearMeMode && userLocation) {
      findNearMeProjects();
    }
  }, [nearMeRadius]);

  // Handle navigation from ProjectView
  useEffect(() => {
    if (location.state?.centerCoordinates && mapInstance.current) {
      const [longitude, latitude] = location.state.centerCoordinates;
      const view = mapInstance.current.getView();
      view.setCenter(fromLonLat([longitude, latitude]));
      view.setZoom(12); // Zoom in closer for specific project

      // Clear the state to prevent re-centering on subsequent renders
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, mapInstance.current, navigate, location.pathname]);

  // Add hover interaction for tooltips
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    const map = mapInstance.current;

    const handlePointerMove = (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (feature) {
        const properties = feature.get("properties");
        const featureType = properties?.type;

        if (featureType === "lodge") {
          // Show tooltip for lodges
          const coordinate = event.coordinate;
          const pixel = map.getPixelFromCoordinate(coordinate);
          setTooltip({
            visible: true,
            content: properties.name || "No name",
            x: pixel[0] + 10,
            y: pixel[1] - 10,
          });
          map.getTarget().style.cursor = "pointer";
        } else {
          // Hide tooltip
          setTooltip({ visible: false, content: "", x: 0, y: 0 });
          map.getTarget().style.cursor = "";
        }
      } else {
        // Hide tooltip
        setTooltip({ visible: false, content: "", x: 0, y: 0 });
        map.getTarget().style.cursor = "";
      }
    };

    const handlePointerLeave = () => {
      setTooltip({ visible: false, content: "", x: 0, y: 0 });
      map.getTarget().style.cursor = "";
    };

    map.on("pointermove", handlePointerMove);
    map.on("pointerleave", handlePointerLeave);

    return () => {
      map.un("pointermove", handlePointerMove);
      map.un("pointerleave", handlePointerLeave);
    };
  }, [mapInitialized]);

  // Add click interaction for projects
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    const map = mapInstance.current;

    const handleClick = (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (feature) {
        const properties = feature.get("properties");
        const featureType = properties?.type;

        if (featureType === "lodge") {
          // Show lodge details in drawer
          setSelectedLodgeDetails(properties);
          setDrawerOpen(true);
        }
      }
    };

    map.on("click", handleClick);

    return () => {
      map.un("click", handleClick);
    };
  }, [mapInitialized, navigate]);

  // Helper function to get lodge category marker
  const getLodgeMarker = (
    category,
    isSearchResult = false
  ) => {
    const categoryColor = LODGE_CATEGORIES[category]?.color || "#666";
    const strokeWidth = isSearchResult ? 3 : 2;
    const outerRadius = isSearchResult ? 12 : 10;

    let svgIcon = "";

    switch (category) {
      case "luxury":
      case "tented":
      case "eco":
      case "boutique":
      case "family":
      case "romantic":
      default:
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="${outerRadius}" fill="${categoryColor}" stroke="white" stroke-width="${strokeWidth}"/>
            ${
              isSearchResult
                ? `<circle cx="12" cy="12" r="14" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0.8"/>`
                : ""
            }
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" stroke-width="1.5" fill="none"/>
          </svg>
        `;
        break;
    }

    return svgIcon;
  };

  // Create lodge markers
  const createLodgeMarkers = (lodges, isSearchResult = false) => {
    return lodges
      .filter(
        (lodge) =>
          lodge.longitude !== null &&
          lodge.latitude !== null &&
          visibleCategories[lodge.category]
      )
      .map((lodge) => {
        const lon = parseFloat(lodge.longitude);
        const lat = parseFloat(lodge.latitude);

        if (isNaN(lon) || isNaN(lat)) {
          return null;
        }

        const feature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          properties: {
            ...lodge,
            type: "lodge",
            isSearchResult: isSearchResult,
          },
        });

        // Get category specific marker
        const markerSvg = getLodgeMarker(
          lodge.category,
          isSearchResult
        );

        feature.setStyle(
          new Style({
            image: new Icon({
              src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                markerSvg
              )}`,
              scale: 1,
              anchor: [0.5, 0.5],
            }),
          })
        );
        return feature;
      })
      .filter((marker) => marker !== null);
  };

  // Create user location marker
  const createUserLocationMarker = () => {
    if (!userLocation) return null;

    const feature = new Feature({
      geometry: new Point(
        fromLonLat([userLocation.longitude, userLocation.latitude])
      ),
      properties: {
        type: "userLocation",
      },
    });

    feature.setStyle(
      new Style({
        image: new Icon({
          src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#2196f3" stroke="white" stroke-width="3"/>
              <circle cx="16" cy="16" r="6" fill="white"/>
              <circle cx="16" cy="16" r="3" fill="#2196f3"/>
            </svg>
          `)}`,
          scale: 1,
          anchor: [0.5, 0.5],
        }),
      })
    );
    return feature;
  };

  // Update markers when projects, search results, visible categories, or near me mode change
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    const vectorSource = vectorLayerRef.current.getSource();

    // Clear existing markers
    const existingFeatures = vectorSource.getFeatures();
    const lodgeFeatures = existingFeatures.filter(
      (f) => f.get("properties")?.type === "lodge"
    );
    const userLocationFeatures = existingFeatures.filter(
      (f) => f.get("properties")?.type === "userLocation"
    );
    lodgeFeatures.forEach((f) => vectorSource.removeFeature(f));
    userLocationFeatures.forEach((f) => vectorSource.removeFeature(f));

    // Determine which data to show
    let dataToShow;
    if (nearMeMode && nearMeResults.length > 0) {
      dataToShow = nearMeResults;
    } else if (searchResults.length > 0) {
      dataToShow = searchResults;
    } else {
      dataToShow = lodges;
    }

    // Add lodge markers
    const isSearchResult =
      searchResults.length > 0 && dataToShow === searchResults;
    const lodgeMarkers = createLodgeMarkers(dataToShow, isSearchResult);
    vectorSource.addFeatures(lodgeMarkers);

    // Add user location marker if available
    const userLocationMarker = createUserLocationMarker();
    if (userLocationMarker) {
      vectorSource.addFeature(userLocationMarker);
    }
  }, [
    lodges,
    searchResults,
    mapInitialized,
    visibleCategories,
    nearMeMode,
    nearMeResults,
    userLocation,
  ]);

  const handleBaseLayerChange = (event) => {
    const selectedLayer = event.target.value;
    setBaseLayer(selectedLayer);
    if (mapInstance.current) {
      const layers = mapInstance.current.getLayers();
      layers.forEach((layer) => {
        const layerTitle = layer.get("title");
        if (
          layerTitle === "osm" ||
          layerTitle === "satellite" ||
          layerTitle === "terrain"
        ) {
          layer.setVisible(layerTitle === selectedLayer);
        }
      });
    }
  };

  const handleMarkerToggle = (event) => {
    setShowMarker(event.target.checked);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle category toggle
  const handleCategoryToggle = (category) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle select all/deselect all
  const handleSelectAll = () => {
    setVisibleCategories({
      luxury: true,
      tented: true,
      eco: true,
      boutique: true,
      family: true,
      romantic: true,
    });
  };

  const handleDeselectAll = () => {
    setVisibleCategories({
      luxury: false,
      tented: false,
      eco: false,
      boutique: false,
      family: false,
      romantic: false,
    });
  };

  // Search handlers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchColumnChange = (event) => {
    setSearchColumn(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchColumn("all");
    setSearchResults([]);
    setSearchError(null);
  };

  const clearNearMe = () => {
    setNearMeMode(false);
    setNearMeResults([]);
    setLocationError(null);
    setUserLocation(null); // Clear user location

    // Reset map view to default
    if (mapInstance.current) {
      const view = mapInstance.current.getView();
      view.setCenter(fromLonLat([36.8219, -1.2921])); // Default center on Nairobi, Kenya
      view.setZoom(7); // Default zoom level
    }
  };

  // Get category counts
  const getCategoryCounts = () => {
    const counts = {};
    const categories = Object.keys(LODGE_CATEGORIES);
    let dataToCount;

    if (nearMeMode && nearMeResults.length > 0) {
      dataToCount = nearMeResults;
    } else if (searchResults.length > 0) {
      dataToCount = searchResults;
    } else {
      dataToCount = lodges;
    }

    categories.forEach((category) => {
      counts[category] = dataToCount.filter(
        (lodge) =>
          lodge.category === category &&
          lodge.longitude !== null &&
          lodge.latitude !== null
      ).length;
    });

    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <Box
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
          {/* Header Section */}
          <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 }, textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, md: 1.5 },
                color: "#5D4037",
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              }}
            >
              Only the best in Africa
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 1, md: 1.5 },
                color: "text.primary",
                fontSize: { xs: "0.875rem", md: "1rem" },
                lineHeight: 1.7,
              }}
            >
              We work closely with the most renowned lodges in Africa to make your dream trip unforgettable.
            </Typography>
          </Box>

          {/* Search and Filter Controls */}
          <Box
            sx={{
              mb: 0.5,
              p: 1,
              backgroundColor: "#f8f9fa",
              borderRadius: 1,
              border: "1px solid #e0e0e0",
            }}
          >
            {/* Near Me Controls */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                mb: 0.5,
                gap: 1,
              }}
            >
            {/* Near Me Button */}
            <Button
              variant={nearMeMode ? "contained" : "outlined"}
              size="small"
              onClick={findNearMeProjects}
              disabled={isGettingLocation}
              startIcon={
                isGettingLocation ? (
                  <CircularProgress size={16} />
                ) : (
                  <MyLocationIcon />
                )
              }
              sx={{
                minWidth: 120,
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: nearMeMode ? "#2196f3" : "transparent",
                borderColor: "#2196f3",
                color: nearMeMode ? "white" : "#2196f3",
                "&:hover": {
                  backgroundColor: nearMeMode ? "#1976d2" : "#e3f2fd",
                  borderColor: "#1976d2",
                },
                "&:disabled": {
                  backgroundColor: "transparent",
                  borderColor: "#ccc",
                  color: "#999",
                },
              }}
            >
              {isGettingLocation ? "Getting Location..." : "Near Me"}
            </Button>

            {/* Radius Input (shown when near me mode is active) */}
            {nearMeMode && (
              <TextField
                size="small"
                type="number"
                label="Radius (km)"
                value={nearMeRadius}
                onChange={(e) =>
                  setNearMeRadius(parseFloat(e.target.value) || 10)
                }
                inputProps={{
                  min: 0.1,
                  max: 1000,
                  step: 0.1,
                }}
                sx={{
                  minWidth: 120,
                  maxWidth: 120,
                  "& .MuiInputBase-root": {
                    fontSize: "0.75rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "0.7rem",
                  },
                }}
              />
            )}

            {/* Center on Location Button */}
            {userLocation && (
              <Button
                variant="outlined"
                size="small"
                onClick={centerOnUserLocation}
                startIcon={<LocationSearchingIcon />}
                sx={{
                  minWidth: 100,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#4caf50",
                  color: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#e8f5e8",
                    borderColor: "#388e3c",
                  },
                }}
              >
                Center
              </Button>
            )}

            {/* Clear Near Me Button */}
            {nearMeMode && (
              <Button
                variant="outlined"
                size="small"
                onClick={clearNearMe}
                startIcon={<ClearIcon />}
                sx={{
                  minWidth: 100,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#f44336",
                  color: "#f44336",
                  "&:hover": {
                    backgroundColor: "#ffebee",
                    borderColor: "#d32f2f",
                  },
                }}
              >
                Clear
              </Button>
            )}
          </Box>

          {/* Search Bar Row */}
          <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 1.5 },
            alignItems: { xs: "stretch", sm: "center" },
            mb: 0,
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          {/* Left side - Search controls */}
          <Box sx={{ 
            display: "flex", 
            gap: { xs: 1, sm: 2 }, 
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", md: "auto" }
          }}>
            {/* Search Input */}
            <TextField
              size="small"
              placeholder="Search by lodge name, location, category..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                width: { xs: "100%", sm: 350 },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={clearSearch}
                      sx={{ p: 0.5 }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Search Column Selector */}
            <FormControl size="small" sx={{ 
              minWidth: { xs: "100%", sm: 150 },
              width: { xs: "100%", sm: "auto" }
            }}>
              <InputLabel>Search in</InputLabel>
              <Select
                value={searchColumn}
                onChange={handleSearchColumnChange}
                label="Search in"
              >
                <MenuItem value="all">All Fields</MenuItem>
                <MenuItem value="name">Lodge Name</MenuItem>
                <MenuItem value="location">Location</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="description">Description</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Right side - Search Status Indicators */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {/* Search Status Indicators */}
            {isSearching && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  ml: 1,
                }}
              >
                <CircularProgress size={12} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "0.7rem" }}
                >
                  Searching...
                </Typography>
              </Box>
            )}

            {searchResults.length > 0 && !isSearching && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  ml: 1,
                  px: 1,
                  py: 0.5,
                  backgroundColor: "#e3f2fd",
                  borderRadius: 1,
                  border: "1px solid #2196f3",
                }}
              >
                <Typography variant="caption" color="primary" fontWeight="bold">
                  {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} found
                </Typography>
              </Box>
            )}

            {searchError && (
              <Chip
                label={`Error: ${
                  searchError.length > 15
                    ? searchError.substring(0, 15) + "..."
                    : searchError
                }`}
                color="error"
                size="small"
                onDelete={() => setSearchError(null)}
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  ml: 1,
                }}
              />
            )}

            {searchResults.length > 0 && !nearMeMode && (
              <Chip
                label={`${searchResults.length} results`}
                color="primary"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  ml: 1,
                }}
              />
            )}

            {nearMeMode && nearMeResults.length > 0 && (
              <Chip
                label={`${nearMeResults.length} within ${nearMeRadius}km`}
                color="info"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  ml: 1,
                }}
              />
            )}

            {locationError && (
              <Chip
                label={`Location: ${
                  locationError.length > 15
                    ? locationError.substring(0, 15) + "..."
                    : locationError
                }`}
                color="error"
                size="small"
                onDelete={() => setLocationError(null)}
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  ml: 1,
                }}
              />
            )}
          </Box>
        </Box>
          </Box>

          {/* Map Container */}
          <Box
            ref={mapRef}
            sx={{
              width: "100%",
              height: "calc(100vh - 200px)",
              position: "relative",
              "& .ol-zoom": {
            top: "1em",
            left: "1em",
            background: "none",
            border: "none",
            padding: 0,
            "& .ol-zoom-in, & .ol-zoom-out": {
              background: "rgba(255,255,255,0.8)",
              border: "1px solid #ccc",
              borderRadius: "2px",
              margin: "2px",
              width: "28px",
              height: "28px",
              lineHeight: "28px",
            },
            },
            // Remove animations that cause blinking
            "& .ol-layer-animating": {
              transition: "none",
            },
            "& .ol-layer": {
              transition: "none",
            },
            "& .ol-tile": {
              transition: "none",
            },
            "& .ol-tile-loading": {
              opacity: 1,
            },
            "& .ol-tile-loaded": {
              opacity: 1,
            },
            "& .ol-rotate": {
              top: "4.5em",
              right: "auto",
              left: "1em",
              background: "rgba(255,255,255,0.8)",
              border: "1px solid #ccc",
              borderRadius: "2px",
              margin: "2px",
              padding: 0,
              "& button": {
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
            "& .ol-zoomslider": {
              display: "none",
            },
          }}
      >
        {/* Tooltip */}
        {tooltip.visible && (
          <Box
            sx={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y,
              zIndex: 1000,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
              pointerEvents: "none",
              maxWidth: "200px",
              wordWrap: "break-word",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "100%",
                left: "10px",
                border: "4px solid transparent",
                borderTopColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            {tooltip.content}
          </Box>
        )}

        {/* Loading indicator positioned on map */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "4px 8px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <CircularProgress size={20} />
             <Typography variant="caption" sx={{ color: "text.secondary" }}>
               Loading lodges...
             </Typography>
          </Box>
        )}

        <Box
          sx={{
            position: "absolute",
            left: "1em",
            top: "10em",
            zIndex: 1000,
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "2px",
            border: "1px solid #ccc",
            padding: "2px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            width: "40px",
            "& .MuiIconButton-root": {
              padding: "4px",
              borderRadius: "2px",
              height: "40px",
              width: "40px",
            },
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "transparent",
              color: baseLayer === "osm" ? "#2196f3" : "#666",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
            onClick={() => handleBaseLayerChange({ target: { value: "osm" } })}
          >
            <MapIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "transparent",
              color: baseLayer === "satellite" ? "#2196f3" : "#666",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
            onClick={() =>
              handleBaseLayerChange({ target: { value: "satellite" } })
            }
          >
            <SatelliteAltIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "transparent",
              color: baseLayer === "terrain" ? "#2196f3" : "#666",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
            onClick={() =>
              handleBaseLayerChange({ target: { value: "terrain" } })
            }
          >
            <TerrainIcon />
          </IconButton>
        </Box>

        {/* Compact Legend Box for applications with filtering */}
        <Box
          sx={{
            position: "absolute",
            bottom: 60,
            right: 10,
            zIndex: 1000,
            backgroundColor: "white",
            borderRadius: 1,
            padding: "8px 12px",
            minWidth: "220px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            opacity: 0.9,
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", mb: 1, fontSize: "14px" }}
          >
            Legend
          </Typography>

          {/* Select All / Deselect All Buttons */}
          <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleSelectAll}
              sx={{
                fontSize: "10px",
                py: 0.25,
                px: 1,
                textTransform: "none",
                borderColor: "#4caf50",
                color: "#4caf50",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "#e8f5e8",
                  borderColor: "#388e3c",
                },
              }}
            >
              All
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={handleDeselectAll}
              sx={{
                fontSize: "10px",
                py: 0.25,
                px: 1,
                textTransform: "none",
                borderColor: "#f44336",
                color: "#f44336",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  borderColor: "#d32f2f",
                },
              }}
            >
              None
            </Button>
          </Box>

          {/* User Location Marker */}
          {userLocation && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mb: 1,
                p: 0.5,
                backgroundColor: "#e3f2fd",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#2196f3",
                  mr: 0.5,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1976d2",
                }}
              >
                Your Location
              </Typography>
            </Box>
          )}

          {/* Project Categories with Checkboxes */}
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              mb: 0.5,
              color: "text.secondary",
            }}
          >
             {nearMeMode ? "Lodges Near You" : "Lodge Categories"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {Object.entries(visibleCategories).map(([category, isVisible]) => (
              <Box
                key={category}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Checkbox
                  checked={isVisible}
                  onChange={() => handleCategoryToggle(category)}
                  size="small"
                  sx={{
                    padding: 0.25,
                    "&.Mui-checked": {
                      color: LODGE_CATEGORIES[category]?.color,
                    },
                    "&:hover": {
                      backgroundColor: `${LODGE_CATEGORIES[category]?.color}20`,
                    },
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: LODGE_CATEGORIES[category]?.color,
                    mr: 0.5,
                    transition: "all 0.2s ease-in-out",
                    opacity: isVisible ? 1 : 0.5,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "11px",
                    fontWeight: isVisible ? 600 : 400,
                    color: isVisible ? "text.primary" : "text.secondary",
                    transition: "all 0.2s ease-in-out",
                    flexGrow: 1,
                  }}
                >
                  {LODGE_CATEGORIES[category]?.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "9px",
                    color: "text.secondary",
                    backgroundColor: isVisible
                      ? `${LODGE_CATEGORIES[category]?.color}20`
                      : "#f5f5f5",
                    px: 0.5,
                    py: 0.1,
                    borderRadius: 0.5,
                    fontWeight: 600,
                    minWidth: "16px",
                    textAlign: "center",
                  }}
                >
                  {categoryCounts[category] || 0}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Summary */}
          <Box
            sx={{
              mt: 1,
              pt: 1,
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "10px",
              }}
            >
              Visible:
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                fontSize: "10px",
              }}
            >
              {Object.entries(visibleCategories)
                .filter(([_, isVisible]) => isVisible)
                .reduce((sum, [category, _]) => sum + (categoryCounts[category] || 0), 0)}
            </Typography>
          </Box>
        </Box>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: "420px" },
              padding: 0,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              position: "fixed",
              top: { xs: 0, sm: "64px" },
              right: 0,
              border: "none",
              boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
              borderRadius: { xs: 0, sm: "8px 0 0 8px" },
              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: { xs: "100vh", sm: "calc(100vh - 64px)" },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: 1,
                borderColor: "divider",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative Elements */}
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -15,
                  left: -15,
                  width: 80,
                  height: 80,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "1.1rem" }}
                >
                  Lodge Details
                </Typography>
                <IconButton
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              {selectedLodgeDetails && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    opacity: 0.9,
                    fontSize: "0.9rem",
                  }}
                >
                  {selectedLodgeDetails?.name}
                </Typography>
              )}
            </Box>

            {/* Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "#f8f9fa",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  minHeight: "56px",
                  "&.Mui-selected": {
                    color: "#667eea",
                    fontWeight: 600,
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#667eea",
                  height: 3,
                  borderRadius: "2px 2px 0 0",
                },
              }}
            >
              <Tab
                icon={<InfoIcon fontSize="small" />}
                label="Basic Info"
                sx={{ minHeight: "56px" }}
              />
              <Tab
                icon={<LocationOnIcon fontSize="small" />}
                label="Location"
                sx={{ minHeight: "56px" }}
              />
            </Tabs>

            {/* Content Area */}
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                p: 3,
              backgroundColor: "#fafafa",
            }}
          >
            {selectedLodgeDetails ? (
              <>
                {tabValue === 0 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Lodge Name
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedLodgeDetails.name}
                      </Typography>
                    </Box>

                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "white",
                          borderRadius: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "text.secondary",
                            mb: 1,
                            fontSize: "0.8rem",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          Category
                        </Typography>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 2,
                            py: 0.5,
                            borderRadius: 3,
                            backgroundColor: `${LODGE_CATEGORIES[
                              selectedLodgeDetails.category
                            ]?.color}20`,
                            color: LODGE_CATEGORIES[
                              selectedLodgeDetails.category
                            ]?.color,
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          {LODGE_CATEGORIES[selectedLodgeDetails.category]
                            ?.label || selectedLodgeDetails.category}
                        </Box>
                      </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Description
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedLodgeDetails.description || "-"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Rating
                      </Typography>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          px: 2,
                          py: 0.5,
                          borderRadius: 3,
                          backgroundColor: "#fff3cd",
                          color: "#856404",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                        }}
                      >
                        ⭐ {selectedLodgeDetails.rating || "-"}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Price
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedLodgeDetails.price || "-"}
                      </Typography>
                    </Box>

                    {/* Distance from user location */}
                    {userLocation &&
                      selectedLodgeDetails.distance !== undefined && (
                        <Box
                          sx={{
                            p: 2,
                            backgroundColor: "white",
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: "text.secondary",
                              mb: 1,
                              fontSize: "0.8rem",
                              textTransform: "uppercase",
                              letterSpacing: 0.5,
                            }}
                          >
                            Distance from You
                          </Typography>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              px: 2,
                              py: 0.5,
                              borderRadius: 3,
                              backgroundColor: "#e3f2fd",
                              color: "#1976d2",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            {selectedLodgeDetails.distance.toFixed(1)} km
                          </Box>
                        </Box>
                      )}
                  </Box>
                )}
                {tabValue === 1 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Location
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedLodgeDetails.location || "-"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Coordinates
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", display: "block" }}
                          >
                            Latitude
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: "text.primary",
                              fontFamily: "monospace",
                            }}
                          >
                            {selectedLodgeDetails.latitude || "-"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", display: "block" }}
                          >
                            Longitude
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: "text.primary",
                              fontFamily: "monospace",
                            }}
                          >
                            {selectedLodgeDetails.longitude || "-"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "200px",
                    textAlign: "center",
                    p: 3,
                  }}
                >
                  <InfoIcon
                    sx={{
                      fontSize: 48,
                      color: "text.secondary",
                      mb: 2,
                      opacity: 0.5,
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    No Item Selected
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ opacity: 0.7 }}
                  >
                    Click on a marker on the map to view details
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Bottom Button */}
            <Box
              sx={{
                p: 3,
                borderTop: 1,
                borderColor: "divider",
                marginTop: "auto",
                backgroundColor: "white",
                boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  // Navigate to lodge details if needed
                  // For now, just close the drawer
                  setDrawerOpen(false);
                }}
                sx={{
                  py: 1.5,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                View Full Details
              </Button>
            </Box>
          </Box>
         </Drawer>
           </Box>

           {/* Lodge Partners Section */}
           <Box
             sx={{
               mt: { xs: 3, md: 4 },
               pt: { xs: 3, md: 4 },
               borderTop: "1px solid #e0e0e0",
             }}
           >
             <Typography
               variant="h4"
               sx={{
                 textAlign: "center",
                 mb: { xs: 3, md: 4 },
                 fontWeight: 600,
                 color: "#5D4037",
                 fontSize: { xs: "1.5rem", md: "2rem" },
               }}
             >
               Our Partner Lodges
             </Typography>
           <Box
             sx={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "space-around",
               alignItems: "center",
               gap: { xs: 2, md: 3 },
               px: { xs: 1, md: 2 },
             }}
           >
             {[
               { 
                 name: "Lion Sands", 
                 subtitle: "GAME RESERVE",
                 logo: (
                   <Box sx={{ textAlign: "center" }}>
                     <Typography
                       sx={{
                         fontFamily: "'Brush Script MT', cursive",
                         fontSize: { xs: "1.5rem", md: "2rem" },
                         color: "#333",
                         fontWeight: 400,
                         lineHeight: 1.2,
                       }}
                     >
                       Lion Sands
                     </Typography>
                     <Typography
                       sx={{
                         fontSize: { xs: "0.6rem", md: "0.7rem" },
                         color: "#666",
                         letterSpacing: "0.15em",
                         textTransform: "uppercase",
                         mt: 0.5,
                       }}
                     >
                       GAME RESERVE
                     </Typography>
                   </Box>
                 )
               },
               { 
                 name: "Abstract Lines",
                 subtitle: "",
                 logo: (
                   <Box
                     sx={{
                       width: { xs: 60, md: 80 },
                       height: { xs: 60, md: 80 },
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                     }}
                   >
                     <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                       {[...Array(12)].map((_, i) => (
                         <line
                           key={i}
                           x1={20 + (i % 4) * 5}
                           y1={10 + Math.random() * 5}
                           x2={20 + (i % 4) * 5}
                           y2={50 - Math.random() * 5}
                           stroke="#000"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                         />
                       ))}
                     </svg>
                   </Box>
                 )
               },
               { 
                 name: "One&Only",
                 subtitle: "",
                 logo: (
                   <Typography
                     sx={{
                       fontFamily: "'Times New Roman', serif",
                       fontSize: { xs: "1.3rem", md: "1.6rem" },
                       color: "#333",
                       fontWeight: 400,
                       "& .ampersand": {
                         fontStyle: "italic",
                         fontSize: "1.2em",
                       },
                     }}
                   >
                     One<span className="ampersand">&</span>Only
                   </Typography>
                 )
               },
               { 
                 name: "&BEYOND",
                 subtitle: "",
                 logo: (
                   <Box sx={{ textAlign: "center" }}>
                     <svg
                       width={60}
                       height={40}
                       viewBox="0 0 60 40"
                       xmlns="http://www.w3.org/2000/svg"
                       sx={{ mb: 0.5 }}
                     >
                       <path
                         d="M30 5 L35 15 L45 12 L38 20 L48 25 L35 22 L30 32 L25 22 L12 25 L22 20 L15 12 L25 15 Z"
                         fill="#000"
                         stroke="#000"
                         strokeWidth="1"
                       />
                     </svg>
                     <Typography
                       sx={{
                         fontSize: { xs: "0.75rem", md: "0.875rem" },
                         color: "#000",
                         fontWeight: 600,
                         letterSpacing: "0.05em",
                         textTransform: "uppercase",
                       }}
                     >
                       &BEYOND
                     </Typography>
                   </Box>
                 )
               },
               { 
                 name: "Londolozi",
                 subtitle: "",
                 logo: (
                   <Box sx={{ textAlign: "center" }}>
                     <Box
                       sx={{
                         width: { xs: 50, md: 60 },
                         height: { xs: 50, md: 60 },
                         mx: "auto",
                         mb: 1,
                       }}
                     >
                       <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                         <g transform="translate(30,30)">
                           {[0, 90, 180, 270].map((angle, i) => (
                             <ellipse
                               key={i}
                               cx={0}
                               cy={-15}
                               rx="8"
                               ry="20"
                               fill="#000"
                               transform={`rotate(${angle})`}
                               opacity="0.8"
                             />
                           ))}
                         </g>
                       </svg>
                     </Box>
                     <Typography
                       sx={{
                         fontFamily: "'Times New Roman', serif",
                         fontSize: { xs: "0.7rem", md: "0.85rem" },
                         color: "#333",
                         fontWeight: 500,
                         letterSpacing: "0.1em",
                         textTransform: "uppercase",
                       }}
                     >
                       LONDOLOZI
                     </Typography>
                   </Box>
                 )
               },
             ].map((lodge, index) => (
               <Box
                 key={index}
                 sx={{
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "center",
                   justifyContent: "center",
                   gap: 1,
                   flex: { xs: "1 1 calc(50% - 16px)", md: "0 1 auto" },
                   minWidth: { xs: "120px", md: "140px" },
                   maxWidth: { xs: "180px", md: "200px" },
                   transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                   "&:hover": {
                     transform: "translateY(-3px)",
                     opacity: 0.9,
                   },
                 }}
               >
                 <Box
                   sx={{
                     width: "100%",
                     minHeight: { xs: 80, md: 100 },
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     py: 2,
                   }}
                 >
                   {lodge.logo}
                 </Box>
                 {lodge.subtitle && (
                   <Typography
                     variant="caption"
                     sx={{
                       textAlign: "center",
                       color: "text.secondary",
                       fontSize: { xs: "0.65rem", md: "0.75rem" },
                       display: "block",
                     }}
                   >
                     {lodge.subtitle}
                   </Typography>
                 )}
               </Box>
             ))}
           </Box>
           </Box>
         </Paper>
       </Container>
     </Box>
   );
 };
 
 export default CharityMap;
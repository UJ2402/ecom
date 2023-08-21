import { UserContext } from "../App";
import {
  Avatar,
  Badge,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Person, Help, ShoppingBag } from "@mui/icons-material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "./cart/CartSlice";
function NavBar() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const handleNavigate = (path) => {
    navigate(path);
  };

  const [searchValue, setSearchValue] = useState("");

  

  const cartItems = useSelector(selectCartItems);

  const totalItems = Object.values(cartItems).reduce(
    (total, qty) => total + qty,
    0
  );

  const handleSearch = (searchValue) => {
    if (searchValue.trim() !== "") {
      navigate(`/allProducts?search=${searchValue}`, { replace :true});
    }
  };

  return (
    <AppBar position="sticky" sx={{ width: "100%" }}>
      <Toolbar>
        <IconButton
        
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => handleNavigate(`/allProducts`)}
          sx={{ pl: 1 }}
        >
          <StorefrontIcon />
        </IconButton>
       
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate(`/`)}
        >
          Vastra
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "150px",
            mr: "2%",
          }}
        >
          <TextField
            type="search"
            id="search-input"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearch(e.target.value);
              if (!e.target.value.trim()) {
                navigate('/', { replace: true });

              } 
            }}
            placeholder="search..."
            fullWidth
            style={{
              backgroundColor: theme.palette.secondary.main,
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
              borderRadius: "35px",
              // height: "0"
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon style={{ color: theme.palette.primary.main }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack direction="row" spacing={2}>
          {user ? (
            <Avatar
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/profilePage`)}
              src={user.photoURL}
            />
          ) : (
            <IconButton
              onClick={() => navigate(`/loginPage`)}
              color="secondary"
            >
              <Badge badgeContent="?" color="error"></Badge>
              <Person />
            </IconButton>
          )}
          <IconButton onClick={() => navigate(`/cart`)} color="secondary">
            <Badge badgeContent={totalItems} color="error">
              <ShoppingBag />
            </Badge>
          </IconButton>
          <IconButton color="secondary">
            <Help />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

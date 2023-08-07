import { UserContext } from "../App";
import { Avatar, Badge, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { Person, Help, ShoppingBag } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Input,
  Box,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { selectCartItems } from "./cart/CartSlice";
function NavBar() {
  const [searchValue, setSearchValue] = useState("");
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };
 
 const theme=useTheme();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  }

  const handleSearchInputClick = () => {
    if (searchValue === "") {
      setSearchValue("");
    }
  };

  const [open, setOpen] = useState(false);

  const handleSidebar = () => {
    setOpen(!open);
  };

  const cartItems = useSelector(selectCartItems);

  const totalItems = Object.values(cartItems). reduce((total, qty) => total + qty, 0);

  return (
    <AppBar position="sticky" sx={{width : '100vw'}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={handleSidebar}
          sx={{pl:3}}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={open} onClose={handleSidebar}>
          <List>
            <ListItem button onClick={() => handleNavigate(`/men`)}>
              <ListItemText primary="Men" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate(`/women`)}>
              <ListItemText primary="Women" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate(`/kids`)}>
              <ListItemText primary="Kids" />
            </ListItem>
            {/* Add more items as needed */}
          </List>
        </Drawer>
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
            maxWidth: '200px',
          }}
        >
          <Input
            type="search"
            color="secondary"
            
            id="search-input"
            value={searchValue}
            onChange={handleSearchInputChange}
            onClick={handleSearchInputClick}
            inputProps={{ style: { color: theme.palette.secondary.main } }}
            
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
            <IconButton onClick={() => navigate(`/loginPage`)} color="secondary">
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
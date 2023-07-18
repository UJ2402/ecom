import { useState } from "react";
import { Storefront, Person, Help, ShoppingBag } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Input,
  Box,
} from "@mui/material";

function NavBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchInputClick = () => {
    if (searchValue === "") {
      setSearchValue("");
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Storefront />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vastra
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            type="search"
            id="search-input"
            value={searchValue}
            onChange={handleSearchInputChange}
            onClick={handleSearchInputClick}
          />
        </Box>
        <Stack direction="row" spacing={2}>
          <IconButton>
            <Person />
          </IconButton>
          <IconButton>
            <ShoppingBag />
          </IconButton>
          <IconButton>
            <Help />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
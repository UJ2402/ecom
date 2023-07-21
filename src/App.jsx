import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import { Grid } from "@mui/material";
import ProductPage from "./Pages/ProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          width: "100vw",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ width: "100" }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="/productPage/:productId"
              element={<ProductPage />}
            ></Route>
            <Route path="/loginPage" element={<LoginPage />}></Route>
            <Route path="/allProducts" element={<ProductGrid />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </Grid>
      </div>
    </BrowserRouter>
  );
}

export default App;

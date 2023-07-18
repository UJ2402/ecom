import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import { Grid } from "@mui/material";
import ProductPage from "./components/ProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          width: "100vw",
        }}
      >
        <NavBar />
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ width: "100%", marginTop: 1 }}
        >
          {/* <Banner /> */}
          {/* <h1 style={{ alignItems: "left" }}>Our Bestsellers</h1> */}
          <Routes>
            <Route
              path="/productPage/:productId"
              element={<ProductPage />}
            ></Route>
            <Route
              path="/allProducts"
              element={<ProductGrid></ProductGrid>}
            ></Route>
          </Routes>
        </Grid>
      </div>
    </BrowserRouter>
  );
}

export default App;

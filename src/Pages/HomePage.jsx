import Banner from "../components/Banner";
import ProductGrid from "../components/ProductGrid";
import { Grid } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", marginTop: -1, ml: 1 }}
      >
        <Banner />
        <h1 style={{ alignItems: "left" }}>Our Bestsellers</h1>
        <ProductGrid />
      </Grid>
    </div>
  );
};

export default HomePage;

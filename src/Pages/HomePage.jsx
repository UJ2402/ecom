import Banner from "../Components/Banner";
import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import BestSeller from "../Components/BestSeller";
import { ProductsContext } from "../Components/ProductsContext";

const HomePage = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", marginTop: "0", ml: "1px" }}
      >
        <Banner />
        <Typography sx={{ pt: 2, fontWeight: "regular" }} variant="h2">
          Our Bestsellers
        </Typography>
        <BestSeller allProducts={products} />
      </Grid>
    </div>
  );
};

export default HomePage;

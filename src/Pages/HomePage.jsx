import Banner from "../components/Banner";
import { useContext } from "react";
import { Grid } from "@mui/material";
import BestSeller from "../components/BestSeller";
import { ProductsContext } from "../components/ProductsContext";

const HomePage = () => {
  const {products} = useContext(ProductsContext);
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
        <BestSeller  allProducts={products}/>
      </Grid>
    </div>
  );
};

export default HomePage;

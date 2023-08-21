import { CircularProgress, Fab, Grid } from "@mui/material";
import { useContext, useState, useMemo,  } from "react";

import { useSearchParams } from "react-router-dom";
// import { db } from "../Firebase";
import { ProductCard } from "../components/ProductCard";
import { UserContext } from "../App";
import { ProductsContext } from "../components/ProductsContext";
import FilterDialog from "../components/Filter";
import FilterListIcon from "@mui/icons-material/FilterList";
import { WishlistContext } from "../components/WishlistContext";

  
const AllProductsPage = () => {
  const { products, filters, setFilters } = useContext(ProductsContext);
  const user = useContext(UserContext);
  const {userWishlist, isLoading} = useContext(WishlistContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const displayedProducts = useMemo(() => {

    let filteredProducts = searchQuery
      ? products.filter(
          (product) => product && product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products;

    if (filters.gender && filters.gender.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product && filters.gender.includes(product.gender)
      );
    }
    
    if (filters.category && filters.category.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product && filters.category.includes(product.category)
      );
    }

 
    return filteredProducts;
  }, [searchQuery, products, filters]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!displayedProducts || displayedProducts.length === 0) {
    return <div>No Products Found</div>;
  }

  if (!user || !user.uid) {
    return <CircularProgress />;
}


  return (
    <div>
      <Grid item container spacing={3} width="100%">
        {displayedProducts.map(
          (product) => product && (
            <ProductCard
              key={product.id}
              product={product}
              initialInWishlist={userWishlist.includes(product.id)}
            />
          )
        )}
      </Grid>
      <Fab
        color="primary"
        style={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => setFilterDialogOpen(true)}
      >
        <FilterListIcon />
      </Fab>

      {/* The filter dialog */}
      <FilterDialog
        open={filterDialogOpen}
        currentFilters={filters}
        onClose={() => setFilterDialogOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default AllProductsPage;

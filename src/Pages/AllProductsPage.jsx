import { CircularProgress, Fab, Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { db } from "../Firebase";
import { ProductCard } from "../components/ProductCard";
import { UserContext } from "../App";
import { ProductsContext } from "../components/ProductsContext";
import FilterDialog from "../components/Filter";
import FilterListIcon from "@mui/icons-material/FilterList";

const AllProductsPage = () => {
  const { products, filters, setFilters } = useContext(ProductsContext);
  const user = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [userWishlist, setUserWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  // console.log("Received Products from Context: ", products); // Log 1

  const fetchUserWishlist = useCallback(async () => {
    if (!user || !user.uid) {
      setIsLoading(false);
      return;
    }

    try {
      const wishlistRef = collection(db, "user_cart_data", user.uid, "wishlist");
      const querySnapshot = await getDocs(wishlistRef);
      const wishlistItems = [];
      querySnapshot.forEach((doc) => {
        wishlistItems.push(doc.id);
      });
      setUserWishlist(wishlistItems);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      fetchUserWishlist();
    }
  }, [user, fetchUserWishlist]);

  const displayedProducts = useMemo(() => {
    // console.log("Products before filter: ", products); // Log 2

    let filteredProducts = searchQuery
      ? products.filter(
          (product) => product && product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products;

    // console.log("Products after search filter: ", filteredProducts); // Log 3

    if (filters.gender && filters.gender.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product && filters.gender.includes(product.gender)
      );
    }

    // console.log("Products after gender filter: ", filteredProducts); // Log 4

    if (filters.category && filters.category.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product && filters.category.includes(product.category)
      );
    }

    // console.log("Products after category filter: ", filteredProducts); // Log 5

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

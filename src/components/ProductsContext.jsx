import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../Firebase";
import PropTypes from "prop-types";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

export const ProductsContext = createContext({
  products: [],
  filters: {},
  setFilters: () => {},
});

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
  });

  // Function to apply filters and update the URL
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  
    const params = new URLSearchParams();
    params.append("gender", newFilters.gender.join(","));
    params.append("category", newFilters.category.join(","));
  
    navigate(`?${params.toString()}`);
  };

  // This effect runs when the URL changes.
  // It reads the filters from the URL's query parameters,
  // updates the filters state with the new filters,
  // and uses the new filters to query the products.
  useEffect(() => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(location.search);
    const gender = params.get("gender");
    const category = params.get("category");
  
    // Update the filters based on the query parameters
    const newFilters = {
      gender: gender ? gender.split(",") : [],
      category: category ? category.split(",") : [],
    };
  
    // Update the filters state
    setFilters(newFilters);
  
    // Create a Firestore query based on the filters
    let productsQuery = collection(db, "products");
  
    if (newFilters.gender.length > 0) {
      productsQuery = query(
        productsQuery,
        where("gender", "in", newFilters.gender)
      );
    }
  
    if (newFilters.category.length > 0) {
      productsQuery = query(
        productsQuery,
        where("category", "in", newFilters.category)
      );
    }
  
    // Fetch the products using the query
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setProducts(productsList);
      } catch (error) {
        setProducts([]); // Explicitly set to an empty array in case of error
      }
    };
  
    // Fetch the products
    fetchProducts();
  }, [location.search]);

  // The context value to provide to the children components
  const value = {
    products,
    filters,
    setFilters: handleApplyFilters, // Use the handleApplyFilters function
  };

  // Render the context provider with the value
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsContext;

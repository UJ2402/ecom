import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../Firebase";
import PropTypes from "prop-types";
import { collection, query, where, getDocs } from "firebase/firestore";

export const ProductsContext = createContext({
  products: [],
  filters: {},
  setFilters: () => {},
});


// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  console.log("ProductsProvider is rendering");

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
  });

  useEffect(() => {
    // Create a Firestore query based on the filters
    let productsQuery = collection(db, "products");

    if (filters.gender.length > 0) {
      productsQuery = query(
        productsQuery,
        where("gender", "in", filters.gender)
      );
    }

    if (filters.category.length > 0) {
      productsQuery = query(
        productsQuery,
        where("category", "in", filters.category)
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
        console.log('Fetched Products List:', productsList); // add this line

      } catch (error) {
        setProducts([]); // Explicitly set to an empty array in case of error
      }
    };

    fetchProducts();
  }, [filters]);

  const value = {
    products,
    filters,
    setFilters,
  };

  console.log("Type of products in Provider:", typeof products);
  console.log("Value of products in Provider:", products);

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

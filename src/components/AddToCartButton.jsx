import { IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AddToCartButton = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };
  return (
    <AddShoppingCartIcon sx={{cursor: "pointer"}} />
  );
};

export default AddToCartButton;

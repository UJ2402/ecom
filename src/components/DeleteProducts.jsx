import { useContext, useState, Fragment } from "react";
import { ProductsContext } from "./ProductsContext";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../Firebase";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteProducts = () => {
  const products = useContext(ProductsContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    } else {
      setSelectedProducts((prev) => [...prev, productId]);
    }
  };

  const handleDelete = async () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    for (let productId of selectedProducts) {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
    }
    setSelectedProducts([]);
    setDeleteDialogOpen(false);
    setSnackbarMessage("Selected products deleted successfully!");
  };

  return (
    <Fragment>
      <div style={{position: "relative"}}>
      <IconButton
  variant="contained"
  color="secondary"
  style={{
    position: "fixed",
    top: 100,
    right: 50,
    zIndex: 3,
    color: selectedProducts.length === 0 ? 'rgba(0, 0, 0, 0.26)' : 'inherit'  // faded color when disabled
  }}
  onClick={handleDelete}
  disabled={selectedProducts.length === 0}
>
  <DeleteIcon />
</IconButton>



      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5">Select Products to Delete</Typography>
        </Grid>
        
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <div style={{ position: "relative" }}>
                <Checkbox
                  style={{ position: "absolute", zIndex: 2, top: 5, left: 5 }}
                  onChange={() => toggleProductSelection(product.id)}
                  checked={selectedProducts.includes(product.id)}
                />
              </div>
              <Card variant="outlined">
                <CardMedia
                  component="img"
                  image={product.images[0]}
                  alt={product.name}
                  style={{ height: 150, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.category} | {product.gender}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Deletion Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected products?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
      />
      </div>
      
    </Fragment>
  );
};

export default DeleteProducts;

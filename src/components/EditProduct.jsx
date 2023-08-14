import { useContext, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { db } from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import ProductForm from "./ProductForm";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const EditProduct = () => {
  const products = useContext(ProductsContext);
  const [imageURLs, setImageURLs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [editableProduct, setEditableProduct] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setEditableProduct({ ...product, sizes: product.sizes.join(", ") });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newImageURLs = selectedFiles.map((file) => URL.createObjectURL(file));
  
    // Merge old imageFiles and new selectedFiles
    setImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  
    // Merge old imageURLs and newImageURLs
    setImageURLs((prevURLs) => [...prevURLs, ...newImageURLs]);
  };
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setEditableProduct((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setEditableProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
  if (selectedProduct) {
    // Upload new images to Firebase Storage and get their URLs
    const storage = getStorage();
    const newImageURLs = [];
    for (let file of imageFiles) {
      const storageRef = ref(storage, `products/${file.name}`);
      await uploadBytesResumable(storageRef, file);
      const imageURL = await getDownloadURL(storageRef);
      newImageURLs.push(imageURL);
    }

    const productRef = doc(db, "products", selectedProduct.id);
    await updateDoc(productRef, {
      ...editableProduct,
      sizes: editableProduct.sizes.split(", "),
      // Merge existing images with new ones
      images: [...editableProduct.images, ...newImageURLs]
    });

    alert("Product updated successfully!");
  } else {
    alert("Please select a product to edit.");
  }
};


  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Typography variant="h5">Select a Product to Edit</Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card onClick={() => handleProductSelect(product)}>
                <CardMedia
                  component="img"
                  image={product.images[0]}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={8}>
        {selectedProduct ? (
          <>
            <Typography variant="h5">Edit Product</Typography>
            <ProductForm
              mode="edit"
              product={editableProduct}
              handleChange={handleFormChange} 
              handleImageChange={handleImageChange} 
              setImageFiles={setImageFiles}
              imageURLs={editableProduct ? [...editableProduct.images, ...imageURLs] : []}
              
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Product
            </Button>
          </>
        ) : (
          <Typography>
            Select a product from the left to edit its details.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default EditProduct;

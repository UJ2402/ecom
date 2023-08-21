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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const EditProduct = () => {
  const { products } = useContext(ProductsContext);
  const [oldImageURLs, setOldImageURLs] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImageURLs, setNewImageURLs] = useState([]);

  const [editableProduct, setEditableProduct] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setEditableProduct({ ...product, sizes: product.sizes.join(", ") });
    setOldImageURLs(product.images);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newImageURLs = selectedFiles.map((file) => URL.createObjectURL(file));

    // Merge old imageFiles and new selectedFiles
    setNewImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    // Merge old imageURLs and newImageURLs
    setNewImageURLs((prevURLs) => [...prevURLs, ...newImageURLs]);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setEditableProduct((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setEditableProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (index, isNew) => {
    if (isNew) {
      const newFiles = [...newImageFiles];
      const newURLs = [...newImageURLs];
      newFiles.splice(index, 1);
      newURLs.splice(index, 1);
      setNewImageFiles(newFiles);
      setNewImageURLs(newURLs);
    } else {
      // This is an existing image, remove its URL from the oldImageURLs state
      const newURLs = [...oldImageURLs];
      newURLs.splice(index, 1);
      setOldImageURLs(newURLs);
      // The actual deletion of the image from Firebase Storage will be handled by a Cloud Function
    }
  };

  const handleUpdate = async () => {
    const allImages = [...oldImageURLs, ...newImageURLs];
    if (allImages.length === 0) {
      alert("Please add at least one image.");
      return;
    }

    if (selectedProduct) {
      // Upload new images to Firebase Storage and get their URLs
      const storage = getStorage();
      const uploadedImageURLs = [];
      for (let file of newImageFiles) {
        const uniqueName = `${file.name}_${Date.now()}`;
        const storageRef = ref(storage, `products/${uniqueName}`);

        await uploadBytesResumable(storageRef, file);
        const imageURL = await getDownloadURL(storageRef);
        uploadedImageURLs.push(imageURL);
      }

      const productRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productRef, {
        ...editableProduct,
        sizes: editableProduct.sizes.split(", "),
        // Merge existing images with new ones
        images: [...oldImageURLs, ...uploadedImageURLs],
      });

      alert("Product updated successfully!");
      setNewImageFiles([]);
      setNewImageURLs([]);
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
                  image={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "default_image_link"
                  }
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
              oldImageURLs={oldImageURLs}
              setImageFiles={setNewImageFiles}
              imageFiles={newImageFiles}
              setImageURLs={setNewImageURLs}
              handleRemoveImage={handleRemoveImage}
              imageURLs={[...oldImageURLs, ...newImageURLs]}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Product
            </Button>
          </>
        ) : (
          <Typography>Select a product to edit its details.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default EditProduct;

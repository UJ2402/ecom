import { Button, Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { db } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ProductForm from "./ProductForm";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    images: [],
    gender: "",
    category: "",
    sizes: [],
  });

  const [imageURLs, setImageURLs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setProduct({ ...product, [name]: parseFloat(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newImageFiles = [...imageFiles, ...selectedFiles];

    setImageFiles(newImageFiles);
    const newImageURLs  = [...imageURLs, ...selectedFiles.map((file) => URL.createObjectURL(file))];
    setImageURLs(newImageURLs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !imageFiles ||
      !product.gender ||
      !product.category ||
      !product.sizes.length
    ) {
      setOpenErrorSnackbar(true);
      return; // Return early to prevent submission
    }

    const storage = getStorage();
    const uploadedImageURLs = [];
    for (let file of imageFiles) {
      const storageRef = ref(storage, `products/${file.name}`);
      await uploadBytesResumable(storageRef, file);
      const imageURL = await getDownloadURL(storageRef);
      uploadedImageURLs.push(imageURL);
    }

    try {
      const productsRef = collection(db, "products");
      await addDoc(productsRef, {
        ...product,
        images: uploadedImageURLs,
        sizes: product.sizes.split(","),
      });
      setOpenSnackbar(true);
      // clear form
      setProduct({
        name: "",
        description: "",
        price: 0,
        gender: "",
        category: "",
        sizes: "",
      });
      setImageFiles([]);
      setImageURLs([]);
    } catch (error) {
      alert("oh no!");
      console.log(error);
    }
  };

  return (
    <div>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          All fields must be filled out!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          Product added successfully
        </Alert>
      </Snackbar>
      <ProductForm
        product={product}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        imageURLs={imageURLs}
        setImageFiles={setImageFiles}
        setImageURLs={setImageURLs}
        imageFiles={imageFiles}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      >
        Add Product
      </Button>
    </div>
  );
};

export default AddProduct;

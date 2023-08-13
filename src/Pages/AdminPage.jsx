import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
// import RefreshIcon from '@mui/icons-material/Refresh';
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

const AdminPage = () => {
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
    setImageFiles(selectedFiles);
    const urls = [...e.target.files].map((file) => URL.createObjectURL(file));
    setImageURLs(urls);
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
    <Grid
      container
      direction="column"
      spacing={0}
      sx={{ padding: 2, margin: 2 }}
      justifyContent="center"
      alignItems="center"
    >
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
      <Typography variant="h3"> Manage products </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ py: 2, maxWidth: 1000 }}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Product Name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={product.name}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="price"
              type="number"
              label="₹"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={product.price}
            />
          </Grid>

          <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={product.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
                <MenuItem value="Kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={product.category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value="Tops">Tops</MenuItem>
                <MenuItem value="Bottoms">Bottoms</MenuItem>
                <MenuItem value="Dresses">Dresses</MenuItem>
                <MenuItem value="Sweaters">Sweaters</MenuItem>
                <MenuItem value="Footwears">Footwears</MenuItem>

                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              multiline
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={product.description}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="sizes"
              label="Sizes (comma-separated)"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={product.sizes}
            />
          </Grid>

          <Grid item xs={6}>
            {imageFiles.length > 0 ? (
              <>
                {imageURLs.map((url, index) => (
                  <div key={index}>
                    <img
                      src={url}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "15px",
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        const newImageFiles = [...imageFiles];
                        newImageFiles.splice(index, 1);
                        setImageFiles(newImageFiles);

                        const newImageURLs = [...imageURLs];
                        newImageURLs.splice(index, 1);
                        setImageURLs(newImageURLs);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                ))}
                <Button variant="contained" component="label">
                  Add More Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
              </>
            ) : (
              <Button variant="contained" component="label">
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            )}
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 15 }}
        >
          Add Product
        </Button>
      </form>
    </Grid>
  );
};

export default AdminPage;

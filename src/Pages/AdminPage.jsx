import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
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
    price: "",
    image: "",
    gender: "",
    category: "",
    sizes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !imageFile ||
      !product.gender ||
      !product.category ||
      !product.sizes.length
    ) {
      alert("All fields must be filled out!");
      return; // Return early to prevent submission
    }

    const storage = getStorage();
    const storageRef = ref(storage, `products/${imageFile.name}`); //get storage reference of products and create loaction as imagefile.name

    const uploadTask = uploadBytesResumable(storageRef, imageFile); //upload image

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
        alert("Failed to upload image");
      },
      async () => {
        const imageURL = await getDownloadURL(storageRef);

        try {
          const productsRef = collection(db, "products");
          await addDoc(productsRef, {
            ...product,
            image: imageURL,
            sizes: product.sizes.split(","),
          });
          alert("product added successfully");
          // clear form
          setProduct({
            name: "",
            description: "",
            price: "",
            image: "",
            gender: "",
            category: "",
            sizes: "",
          });
          setImageFile(null);
        } catch (error) {
          alert("oh no!");
          console.log(error);
        }
      }
    );
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
            <input type="file" accept="image/*" onChange={handleImageChange} />
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

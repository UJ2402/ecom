import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from 'prop-types';
import { useRef } from 'react';

const ProductForm = ({ product, handleChange, handleImageChange, handleRemoveImage, imageURLs, oldImageURLs}) => {
  const inputRef = useRef();

  return (
    <Grid container spacing={2}>

        
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
        {/* Image upload logic */}
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
    const isNewImage = index >= oldImageURLs.length; // <-- Check if the image is new
    handleRemoveImage(index, isNewImage); // Pass the flag here
    inputRef.current.value = '';
  }}
>
  <CloseIcon />
</IconButton>
          </div>
        ))}
        <Button variant="contained" component="label">
          Add More Images
          <input
            ref = {inputRef}
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>
      </Grid>
    </Grid>
  );
};

ProductForm.propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      gender: PropTypes.string,
      category: PropTypes.string,
      sizes: PropTypes.string
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    imageURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
    oldImageURLs: PropTypes.arrayOf(PropTypes.string).isRequired, 
    // setImageFiles: PropTypes.func.isRequired,
    // setImageURLs: PropTypes.func.isRequired,
    // imageFiles: PropTypes.arrayOf(PropTypes.instanceOf(File)),
    handleRemoveImage: PropTypes.func.isRequired,


  }
export default ProductForm;

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import PropTypes from "prop-types";

const FilterDialog = ({ open, currentFilters, onClose, onApply }) => {
  const [genderFilters, setGenderFilters] = useState(currentFilters.gender);
  const [categoryFilters, setCategoryFilters] = useState(
    currentFilters.category
  );

  useEffect(() => {
    setGenderFilters(currentFilters.gender);
    setCategoryFilters(currentFilters.category);
  }, [open, currentFilters]);

  const handleApply = () => {
    onApply({
      gender: genderFilters,
      category: categoryFilters,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Products</DialogTitle>
      <DialogContent>
        <h4>Gender</h4>
        <FormControlLabel
          control={
            <Checkbox
              checked={genderFilters.includes("Men")}
              onChange={() =>
                toggleFilter("Men", genderFilters, setGenderFilters)
              }
            />
          }
          label="Men"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={genderFilters.includes("Women")}
              onChange={() =>
                toggleFilter("Women", genderFilters, setGenderFilters)
              }
            />
          }
          label="Women"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={genderFilters.includes("Kids")}
              onChange={() =>
                toggleFilter("Kids", genderFilters, setGenderFilters)
              }
            />
          }
          label="Kids"
        />

        <h4>Category</h4>
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryFilters.includes("Tops")}
              onChange={() =>
                toggleFilter("Tops", categoryFilters, setCategoryFilters)
              }
            />
          }
          label="Tops"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryFilters.includes("Bottoms")}
              onChange={() =>
                toggleFilter("Bottoms", categoryFilters, setCategoryFilters)
              }
            />
          }
          label="Bottoms"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryFilters.includes("Dresses")}
              onChange={() =>
                toggleFilter("Dresses", categoryFilters, setCategoryFilters)
              }
            />
          }
          label="Dresses"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryFilters.includes("Sweaters")}
              onChange={() =>
                toggleFilter("Sweaters", categoryFilters, setCategoryFilters)
              }
            />
          }
          label="Sweaters"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryFilters.includes("Footwears")}
              onChange={() =>
                toggleFilter("Footwears", categoryFilters, setCategoryFilters)
              }
            />
          }
          label="Footwears"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleApply} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const toggleFilter = (value, filters, setFilters) => {
  if (filters.includes(value)) {
    setFilters(filters.filter((filter) => filter !== value));
  } else {
    setFilters([...filters, value]);
  }
};

FilterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  currentFilters: PropTypes.shape({
    gender: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default FilterDialog;

import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import DeleteProducts from '../components/DeleteProducts';

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState(''); // '', 'add', 'edit', 'delete'

  return (
    <Grid container item >
      <Grid item xs={2}>
        <Button onClick={() => setSelectedOption('add')}>Add Products</Button>
        <Button onClick={() => setSelectedOption('edit')}>Edit Products</Button>
        <Button onClick={() => setSelectedOption('delete')}>Delete Products</Button>
      </Grid>
      <Grid item xs={9}  sx={{pt:2}}>
        {selectedOption === 'add' && <AddProduct />}
        {selectedOption === 'edit' && <EditProduct />}
        {selectedOption === 'delete' && <DeleteProducts />}
      </Grid>
    </Grid>
  );
};

export default AdminPage;

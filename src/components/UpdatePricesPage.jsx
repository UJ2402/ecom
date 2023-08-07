import { Button } from "@mui/material";
import { db } from "../Firebase";
import { collection, getDocs, updateDoc,doc } from "firebase/firestore";


const UpdatePricesPage = () => {
    const updatePrices = async () => {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);

        querySnapshot.forEach(async (document) => {
            const data = document.data();
            if (typeof data.price === 'string') {
                const updatedPrice = parseFloat(data.price);
                if (!isNaN(updatedPrice)) {
                    await updateDoc(doc(db, 'products', document.id), {

                        price: updatedPrice
                    });
                }
            }
        });
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Button variant="contained" color="primary" onClick={updatePrices}>
                Update Prices
            </Button>
        </div>
    );
};

export default UpdatePricesPage;

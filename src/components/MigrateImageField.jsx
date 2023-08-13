import  { useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { deleteField } from "firebase/firestore";

import { db } from '../Firebase'; // or wherever your firebase configurations are

const MigrateImageField = () => {
  useEffect(() => {
    async function removeImageField() {
      const productsRef = collection(db, 'products');
      const productsSnapshot = await getDocs(productsRef);

      if (productsSnapshot.empty) {
        console.log('No products found');
        return;
      }

      productsSnapshot.forEach(async productDoc => {
        const product = productDoc.data();

        if (product.image) {
          console.log(`Removing image field for product: ${product.id}`);
          const productRef = doc(db, 'products', productDoc.id);
          await updateDoc(productRef, { images: [product.image], image: deleteField() });
          console.log(`Removed image field for product: ${product.id}`);
        } else {
          console.log(`Skipping product: ${product.id} (no image field found)`);
        }
      });

      console.log('Image field removal complete');
    }

    removeImageField().catch(error => {
      console.error('Error during image field removal:', error);
    });
  }, []);

  return <div>Removing old image field...</div>;
}

export default MigrateImageField;

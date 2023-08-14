const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const storage = admin.storage();

exports.deleteProductImages = functions.firestore
    .document("products/{productId}")
    .onDelete(async (snap, context) => {
      const deletedProduct = snap.data();
      const imageUrls = deletedProduct.images;
      const deleteOps = [];
      for (const url of imageUrls) {
        const decodedUrl = decodeURIComponent(url);
        const fileNameFragment = decodedUrl.split("/o/")[1];
        const fileName = fileNameFragment.split("?")[0];

        const fileRef = storage.bucket().file(fileName);
        deleteOps.push(fileRef.delete());
      }
      await Promise.all(deleteOps);

      return null;
    });

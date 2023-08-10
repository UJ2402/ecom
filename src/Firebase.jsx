import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeLx6ZRJteH-1rGyNZVibq9DzLD07wKXQ",
  authDomain: "vastra-a861d.firebaseapp.com",
  projectId: "vastra-a861d",
  storageBucket: "vastra-a861d.appspot.com",
  messagingSenderId: "569220995587",
  appId: "1:569220995587:web:998909fe6c83303f7f0c36",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const updateCartInFirestore = async (userId, cartData) => {
  const docRef = doc(db, "user_cart_data", userId);
  try {
    await setDoc(docRef, { cart: cartData });
    console.log("done");
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (userId) => {
  const docRef = doc(db, "user_cart_data", userId);
  try {
    return await getDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};

export const addToWishlist = async (userId, product) => {
  const productRef = doc(db, "user_cart_data", userId, "wishlist", product.id);
  await setDoc(productRef, product);
}

export const removeFromWishlist = async (userId, productId) => {
  const productRef = doc(db, "user_cart_data", userId, "wishlist", productId);
  await deleteDoc(productRef);
}

export const isProductInWishlist = async (userId, productId) => {
  const productRef = doc(db, "user_cart_data", userId, "wishlist", productId);
  const docSnapshot = await getDoc(productRef);
  return docSnapshot.exists();
}

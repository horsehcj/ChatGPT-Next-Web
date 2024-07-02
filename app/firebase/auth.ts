import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { clientConfig } from "./firebaseConfig";

const app = initializeApp(clientConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    const idToken = await result.user.getIdToken();
    console.log("ID token:", idToken);

    // Send the ID token to the server
    await fetch("/api/login", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    // Redirect to the home page
    window.location.assign("/");
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

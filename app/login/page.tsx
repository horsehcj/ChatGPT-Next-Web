"use client";

import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "../firebase/firebase";

const provider = new GoogleAuthProvider();

export default function Login() {
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const result = await signInWithPopup(getAuth(app), provider);
      const idToken = await result.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  return (
    <div>
      <button onClick={handleSubmit}>Sign in with Google</button>
    </div>
  );
}

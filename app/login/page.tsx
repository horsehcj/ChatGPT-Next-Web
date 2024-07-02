"use client";

import React from "react";
import { signInWithGoogle } from "../firebase/auth";

export default function Login() {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

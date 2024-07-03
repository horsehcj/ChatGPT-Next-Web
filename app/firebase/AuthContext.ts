import { createContext, useContext } from "react";
import { UserInfo } from "firebase/auth";
import { Claims } from "next-firebase-auth-edge/lib/auth/claims";
import { userT } from "./firebaseAdmin";

export interface User extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

export interface AuthContextValue {
  user: User;
  fsUser: userT;
}

export const AuthContext = createContext<AuthContextValue>({
  user: {
    uid: "",
    email: null,
    displayName: null,
    photoURL: null,
    phoneNumber: null,
    emailVerified: false,
    providerId: "",
    customClaims: {},
  },
  fsUser: {
    role: "user",
    tokens: 0,
    invited_by: "",
    organization: "",
    last_used: 0,
  },
});

export const useAuth = () => useContext(AuthContext);

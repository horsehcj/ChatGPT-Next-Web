import { initializeApp } from "firebase/app";
import { fbClientConfig } from "./firebaseConfig";
import { UserInfo } from "firebase/auth";
import { Claims } from "next-firebase-auth-edge/lib/auth/claims";

export const app = initializeApp(fbClientConfig);

export type userT = UserInfo & {
  emailVerified: boolean;
  customClaims: Claims;
};

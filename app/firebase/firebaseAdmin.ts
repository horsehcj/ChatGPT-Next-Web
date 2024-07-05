import "server-only";

import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { fbServerConfig } from "./firebaseConfig";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey: params.privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
  });
}

export const adminApp = createFirebaseAdminApp({
  projectId: fbServerConfig.serviceAccount.projectId,
  clientEmail: fbServerConfig.serviceAccount.clientEmail,
  privateKey: fbServerConfig.serviceAccount.privateKey,
});

export type fbUserT = {
  role: string;
  last_used: number; // timestamp
  tokens: number;
  used_tokens: {
    [key: string]: number;
  };
  invited_by: string;
  organization: string;
};

export const getUser = async (
  email: string,
  updateLastUsed: boolean = false,
) => {
  const firestore = getFirestore();
  const user = await firestore.collection("users").doc(email).get();
  const userData = user.data() as fbUserT;

  if (userData && updateLastUsed)
    await firestore
      .collection("users")
      .doc(email)
      .update({ last_used: Date.now() });
  return userData;
};

export const createUser = async (email: string) => {
  const firestore = getFirestore();
  const user: fbUserT = {
    role: "user",
    last_used: Date.now(),
    tokens: 0,
    used_tokens: {},
    invited_by: "",
    organization: "",
  };

  await firestore.collection("users").doc(email).set(user);
  return user;
};

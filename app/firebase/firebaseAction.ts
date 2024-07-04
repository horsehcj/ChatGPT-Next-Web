"use server";

import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export const updateUserToken = async (email: string, usedToken: number) => {
  const firestore = getFirestore();
  await firestore
    .collection("users")
    .doc(email)
    .update({ used_tokens: admin.firestore.FieldValue.increment(usedToken) });
};

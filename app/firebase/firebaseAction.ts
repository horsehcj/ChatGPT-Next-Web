"use server";

import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export const updateUserToken = async (email: string, usedToken: number) => {
  // used_tokens is a map of date to token count
  const todayDateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const firestore = getFirestore();
  await firestore
    .collection("users")
    .doc(email)
    .update({
      [`used_tokens.${todayDateStr}`]:
        admin.firestore.FieldValue.increment(usedToken),
    });
};

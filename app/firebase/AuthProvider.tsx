"use client";

import * as React from "react";
import { AuthContext, User } from "./AuthContext";
import { userT } from "./firebaseAdmin";

export interface AuthProviderProps {
  user: User;
  fsUser: userT;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  user,
  fsUser,
  children,
}) => {
  return (
    <AuthContext.Provider
      value={{
        user,
        fsUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";
import { Tokens, getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { fbClientConfig, fbServerConfig } from "./firebase/firebaseConfig";
import { userT } from "./firebase/firebase";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { createUser, getUser } from "./firebase/firebaseAdmin";

const serverConfig = getServerSideConfig();

const toUser = ({ decodedToken }: Tokens): userT => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken;

  const customClaims = filterStandardClaims(decodedToken);

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
  };
};

export default async function App() {
  const tokens = await getTokens(cookies(), {
    apiKey: fbClientConfig.apiKey,
    cookieName: fbServerConfig.cookieName,
    cookieSignatureKeys: fbServerConfig.cookieSignatureKeys,
    serviceAccount: fbServerConfig.serviceAccount,
  });

  const user = tokens ? toUser(tokens) : null;
  if (!user) return;

  let fbUser = user && user.email ? await getUser(user.email, true) : null;
  if (!fbUser) fbUser = await createUser(user.email as string);

  return (
    <>
      <Home user={{ ...user, ...fbUser }} />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
  );
}

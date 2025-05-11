
import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = "your_session_secret"; // Use env var in production

export const storage = createCookieSessionStorage({
  cookie: {
    name: "wishlist_session",
    secure: false,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export const getSession = (cookieHeader) => storage.getSession(cookieHeader);
export const commitSession = (session) => storage.commitSession(session);

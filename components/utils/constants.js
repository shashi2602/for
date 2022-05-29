export const SITE_ENDPOINT = "https://for-nu.vercel.app/";
export const GET_FAVICON_FROM_SITE_LINK =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";
export const DEV = process.env.NODE_ENV !== "production";

export const SERVER = DEV
  ? "http://localhost:3000"
  : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

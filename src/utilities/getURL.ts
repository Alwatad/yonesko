import canUseDOM from "./canUseDOM";

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL;

  // Prefer Vercel provided production URL when NEXT_PUBLIC_SERVER_URL is not set
  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Fallback for local dev
  if (!url) {
    url = "http://localhost:3000";
  }

  // Normalize to origin only (strip any paths accidentally included in env)
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    // If it's a bare host without protocol, assume https
    return `https://${url}`;
  }
};

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? `:${port}` : ""}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "";
  try {
    const parsed = new URL(serverURL);
    return parsed.origin;
  } catch {
    return serverURL;
  }
};

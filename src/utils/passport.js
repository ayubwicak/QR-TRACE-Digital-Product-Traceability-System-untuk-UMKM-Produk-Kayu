const isLocalHost = hostname =>
  hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';

export const getBatchPassportUrl = batchNumber => {
  const currentUrl = new URL(window.location.href);
  const configuredPublicUrl = import.meta.env.VITE_PUBLIC_APP_URL?.trim();
  const baseUrl = isLocalHost(currentUrl.hostname) && configuredPublicUrl
    ? configuredPublicUrl.replace(/\/+$/, '')
    : currentUrl.origin;

  return `${baseUrl}/verify/${encodeURIComponent(batchNumber)}`;
};

export const getBatchNumberFromPassportPath = pathname => {
  const match = pathname.match(/^\/verify\/([^/]+)\/?$/);
  if (!match) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
};

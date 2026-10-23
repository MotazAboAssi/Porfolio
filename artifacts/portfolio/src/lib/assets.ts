/** Public asset names are preserved verbatim, including spaces and line breaks. */
export function publicAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base.endsWith('/') ? base : `${base}/`}${path.split('/').map(encodeURIComponent).join('/')}`;
}

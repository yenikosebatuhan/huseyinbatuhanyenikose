// Prefixes a /public asset path with the deploy basePath (e.g. the GitHub Pages
// project subpath). Needed for raw <img> and <a> tags, which — unlike next/link
// and next/image — do not get the basePath applied automatically.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

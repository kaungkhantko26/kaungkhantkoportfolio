export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export function withBasePath(path) {
  return `${basePath}${path}`;
}

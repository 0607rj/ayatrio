import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

export const backendRoot = path.resolve(currentDir, "..", "..");
export const backendEnvPath = path.join(backendRoot, ".env");

dotenv.config({ path: backendEnvPath });

export function resolveFromBackendRoot(targetPath) {
  if (!targetPath) {
    return targetPath;
  }

  return path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(backendRoot, targetPath);
}

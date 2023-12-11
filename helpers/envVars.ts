interface EnvVars {
  [key: string]: string;
}

type Keys = string | string[] | { [key: string]: string | undefined };

/**
 * Get environment variables
 *
 * @param keys - Env var key or keys to retrieve
 * @returns Map of string env variables
 * @throws Error if requested an undefined var
 *
 * @example
 * keys as string: `const { DB_USER } = getEnv("DB_USER")`
 * keys as array: `const { DB_USER, DB_PASS } = getEnv(["DB_USER", "DB_PASS"])`
 * keys as object: `const { DB_USER, DB_PASS } = getEnv(process.env)`
 * keys object with overwritten values: `const { DB_USER, DB_PASS } = getEnv({DB_USER: "myUser", DB_PASS: undefined})`
 */
export function getEnvVars(keys: Keys): EnvVars {
  const envVars: { [key: string]: string } = {};

  if (typeof keys === "string") {
    const key = keys;
    const value = process.env[key];

    envVars[key] = validateEnv(key, value);
  } else if (Array.isArray(keys)) {
    keys.forEach((key) => {
      const value = process.env[key];
      envVars[key] = validateEnv(key, value);
    });
  } else if (typeof keys === "object") {
    for (const key in keys) {
      const value = keys[key] ?? process.env[key];
      envVars[key] = validateEnv(key, value);
    }
  }

  return envVars;
}

/**
 * Validates an environment variable is defined
 * Throws descriptive error if variable is undefined
 *
 * @param key - Env variable key
 * @param value - Env variable value
 * @returns Env variable value
 */
function validateEnv(key: string, value: string | undefined) {
  if (value === undefined) throw new Error(`Env var '${key}' is undefined`);
  return value;
}

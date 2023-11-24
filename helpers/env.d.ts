// env.d.ts

/* using TypeScript module augmentation.
This allows you to add properties to existing types in the global scope.
Now the process.env is an Augmented Type
Now it's props typed the way we need (string instead of string | undefined)
*/
declare module NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    USER_DATA_DIR: string;
    USER_EMAIL: string;
    USER_PASSWORD: string;
  }
}

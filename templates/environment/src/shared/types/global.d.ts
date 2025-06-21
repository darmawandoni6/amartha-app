declare namespace NodeJS {
  /**
   * The `ProcessEnv` interface provides type definitions for environment
   * variables in a Node.js application.
   */
  interface ProcessEnv {
    [key: string]: string | undefined;

    /**
     * The current environment in which the application is running (e.g.,
     * 'development', 'production').
     */
    NODE_ENV: string;

    /**
     * A custom environment variable indicating the mode of the application
     * (e.g., 'development', 'uat', 'production', etc.) that might control specific behavior.
     */

    NEXT_PUBLIC_MODE: string;

    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_API_URL: string;

    NEXT_PUBLIC_UNLEASH_URL: string;
    NEXT_PUBLIC_UNLEASH_CLIENT_KEY: string;
    NEXT_PUBLIC_UNLEASH_REFRESH_INTERVAL: string;
    NEXT_PUBLIC_UNLEASH_APP_NAME: string;
    NEXT_PUBLIC_UNLEASH_ENVIRONMENT: string;
  }
}

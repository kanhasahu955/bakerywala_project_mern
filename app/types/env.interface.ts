/**
 * Define EnvConfig interface
 */

export interface IEnvConfig {
  PORT: number | undefined;
  NODE_ENV: string | undefined;
  SERVER_MAINTENANCE: boolean | undefined;

  MONGO_URI: string | undefined;
  DB_NAME: string | undefined;

  API_PREFIX: string | undefined;

  CORS_ENABLED: boolean | undefined;
  LOG_DAYS: number | undefined;

  JWT_SECRET: string | undefined;
  JWT_EXPIRES_IN: string | undefined;

  SENDGRID_API_KEY: string | undefined;
  SMTP_FROM: string | undefined;
}

/**
 * Define FirebaseConfig interface
 */
export interface IFirebaseConfig {
  FIREBASE_API_KEY: string | undefined;
  FIREBASE_AUTH_DOMAIN: string | undefined;
  FIREBASE_PROJECT_ID: string | undefined;
  FIREBASE_STORAGE_BUCKET: string | undefined;
  FIREBASE_MESSAGING_SENDER_ID: string | undefined;
  FIREBASE_APP_ID: string | undefined;
  FIREBASE_MEASUREMENT_ID: string | undefined;
}

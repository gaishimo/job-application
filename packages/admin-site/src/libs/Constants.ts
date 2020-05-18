console.log(process.env)

const Constants = {
  FIREBASE_API_KEY: process.env.fr_api_key,
  FIREBASE_AUTH_DOMAIN: process.env.fr_auth_domain,
  FIREBASE_DATABASE_URL: process.env.fr_database_url,
  FIREBASE_PROJECT_ID: process.env.fr_project_id,
  FIREBASE_APP_ID: process.env.fr_app_id,
}

export default Constants

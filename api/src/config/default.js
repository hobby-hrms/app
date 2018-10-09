module.exports = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URI,
  frontendUrl: process.env.FRONT_END_URL || 'http://localhost:8888',
  bcryptOptions: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS
  },
  jwtOptions: {
    algorithm: process.env.JWT_OPTIONS_ALGORITHM,
    expiresIn: process.env.JWT_OPTIONS_EXPIRES_IN,
    audience: process.env.JWT_OPTIONS_AUDIENCE,
    issuer: process.env.JWT_OPTIONS_ISSUER
  },
  jwtSecretOrKey: process.env.JWT_SECRET_OR_KEY,
  corsOptions: {
    origin: process.env.CORS_ALLOWED_ORIGIN
  },
  mailgun: {
    sender: process.env.MAILGUN_SENDER,
    host: process.env.MAILGUN_HOST,
    user: process.env.MAILGUN_USER,
    password: process.env.MAILGUN_PASSWORD
  },
  aws: {
    s3BaseUrl: process.env.AWS_S3_BASE_URL,
    bucket: process.env.AWS_BUCKET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
}

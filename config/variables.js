module.exports = {
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'example@gmail.com',
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'example_pass',

  MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/hw_2',
  PORT: process.env.PORT || 5000
}

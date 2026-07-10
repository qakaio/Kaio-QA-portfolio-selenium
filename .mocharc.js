module.exports = {
  timeout: 30000,
  retries: 2,
  reporter: 'spec',
  require: ['@babel/register'],
  extensions: ['.js'],
  grep: process.env.GREP,
  bail: false,
};
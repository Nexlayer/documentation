// This is a simple module to mock DATABASE_URL and API_KEY
// This is used for the documentation site which mentions these in examples
// but doesn't actually connect to a database

if (typeof DATABASE_URL === 'undefined') {
  global.DATABASE_URL = 'postgresql://postgres:password@postgres:5432/mydb';
}

if (typeof API_KEY === 'undefined') {
  global.API_KEY = 'example_api_key_12345';
}

// Also ensure process.env has these values
if (typeof process !== 'undefined' && process.env) {
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:password@postgres:5432/mydb';
  process.env.API_KEY = process.env.API_KEY || 'example_api_key_12345';
}

module.exports = {
  DATABASE_URL: global.DATABASE_URL,
  API_KEY: global.API_KEY
};
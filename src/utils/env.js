import 'dotenv/config';

export const env = (name, defaultValue) => {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw Error(`Missing process.env[${name}]`);
}
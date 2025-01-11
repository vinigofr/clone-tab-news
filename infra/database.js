import { Client } from "pg";

const query = async (queryObject) => {
  let client;

  try {
    client = await getNewClient();

    const res = await client.query(queryObject);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
};

const getNewClient = async () => {
  const deniedSSLScopes = ["development", "test"];

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: deniedSSLScopes.includes(process.env.NODE_ENV) ? false : true,
  });

  await client.connect();

  return client;
};

export default {
  query,
  getNewClient,
};

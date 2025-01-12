import migrationRunner from "node-pg-migrate";
import database from "infra/database";
import path from "node:path";

const migrations = async (req, res) => {
  const dbClient = await database.getNewClient();

  const { method } = req;
  const migrationRunnerConfig = {
    dir: path.join("infra", "migrations"),
    migrationsTable: "pgmigrations",
    dbClient: dbClient,
    direction: "up",
    verbose: true,
    dryRun: true,
  };

  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods);
    res.status(405).end();
    return;
  }

  let statusCode;
  if (method === "GET") {
    migrationRunnerConfig.dryRun = true;
  }

  if (method === "POST") {
    migrationRunnerConfig.dryRun = false;
  }

  const migrationInstance = await migrationRunner(migrationRunnerConfig);
  dbClient.end();

  if (method === "GET" || (method === "POST" && migrationInstance.length === 0)) {
    statusCode = 200;
  } else if (method === "POST") {
    statusCode = 201;
  }

  res.status(statusCode).json(migrationInstance);
};

export default migrations;

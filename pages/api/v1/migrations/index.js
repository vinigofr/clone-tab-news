import migrationRunner from "node-pg-migrate";
import path from "node:path";

const migrations = async (req, res) => {
  const migrationInstance = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: path.join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });

  res.status(200).json(migrationInstance);
};

export default migrations;

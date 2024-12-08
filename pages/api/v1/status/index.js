import database from "infra/database";

const status = async (req, res) => {
  const updatedAt = new Date().toISOString();

  const dbVersionQuery = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionQuery.rows[0].server_version;

  const dbMaxConnectionsQuery = await database.query("SHOW max_connections;");
  const dbMaxConnectionsValue = parseInt(dbMaxConnectionsQuery.rows[0].max_connections);

  const databaseName = req.query.databaseName;
  const currentConnectionsQuery = await database.query({
    text: "SELECT count(*)::int as openned_connections FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });

  const currentConnectionsValue = currentConnectionsQuery.rows.length;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: dbMaxConnectionsValue,
        openned_connections: currentConnectionsValue,
      },
    },
  });
};

export default status;

const PREFIX = "http://localhost:3000";

test("GET to api/v1/status should return 200", async () => {
  const response = await fetch(`${PREFIX}/api/v1/status`);
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const responseDatabase = responseBody.dependencies.database;
  expect(responseDatabase).toBeDefined();

  expect(responseDatabase.version).toBeDefined();
  expect(typeof responseDatabase.version).toBe("string");
  expect(responseDatabase.version).toBe("16.0");

  expect(responseDatabase.max_connections).toBeDefined();
  expect(typeof responseDatabase.max_connections).toBe("number");

  expect(responseDatabase.openned_connections).toBeDefined();
  expect(typeof responseDatabase.openned_connections).toBe("number");
  expect(responseDatabase.openned_connections).toBe(1);
});

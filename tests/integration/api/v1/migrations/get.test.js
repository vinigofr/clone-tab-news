const { cleanDatabase } = require("tests/utils/functions");

const PREFIX = "http://localhost:3000";

beforeAll(async () => {
  await cleanDatabase();
});

test("GET to api/v1/migrations should return 200", async () => {
  const response = await fetch(`${PREFIX}/api/v1/migrations`);
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

test("Call to api/v1/migrations should return 405 when HTTP is not GET", async () => {
  const response = await fetch(`${PREFIX}/api/v1/migrations`, { method: "PATCH" });
  expect(response.status).toBe(405);
});

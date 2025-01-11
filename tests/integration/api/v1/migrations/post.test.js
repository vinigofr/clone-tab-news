const { cleanDatabase } = require("tests/utils/functions");

const PREFIX = "http://localhost:3000";

beforeEach(async () => {
  await cleanDatabase();
});

test("POST to api/v1/migrations should return 200", async () => {
  const response = await fetch(`${PREFIX}/api/v1/migrations`, { method: "POST" });
  expect(response.status).toBe(201);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
});

test("Call to api/v1/migrations should return 405 when HTTP is not POST", async () => {
  const response = await fetch(`${PREFIX}/api/v1/migrations`, { method: "PATCH" });
  expect(response.status).toBe(405);
});

test("POST to api/v1/migrations should return data when there are migrations to be executed", async () => {
  const response = await fetch(`${PREFIX}/api/v1/migrations`, { method: "POST" });
  const responseBody = await response.json();

  expect(responseBody.length).toBeGreaterThan(0);
});

test("POST to api/v1/migrations should return an empty array when there are no migrations to be executed", async () => {
  let response = await fetch(`${PREFIX}/api/v1/migrations`, { method: "POST" });

  let responseBody = await response.json();
  expect(response.status).toBe(201);
  expect(responseBody.length).toBeGreaterThan(0);

  response = await fetch(`${PREFIX}/api/v1/migrations`, { method: "POST" });
  expect(response.status).toBe(200);
  responseBody = await response.json();
  expect(responseBody.length).toBe(0);
});

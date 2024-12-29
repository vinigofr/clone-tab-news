const PREFIX = "http://localhost:3000";

test("GET to api/v1/migrations should return 200", async () => {
  const response = await fetch(`${PREFIX}/api/v1/migrations`);
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
});

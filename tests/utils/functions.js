import database from "infra/database";

export async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

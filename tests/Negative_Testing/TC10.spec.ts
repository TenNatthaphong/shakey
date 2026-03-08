import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3333";

test("TC10 - Get Menu List Without Token", async ({ request }) => {
  const res = await request.get(`${BASE_URL}/menu`);

  expect(res.status()).toBe(401);

  const body = await res.json();

  expect(body.message).toBeDefined();
});

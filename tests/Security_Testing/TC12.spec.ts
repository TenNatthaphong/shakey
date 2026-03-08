import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3333";

test("TC12 – Access Order History Without Login", async ({ request }) => {
  const res = await request.get(`${BASE_URL}/order/history`);

  expect(res.status()).toBe(401);

  const body = await res.json();

  expect(body.message).toBeDefined();
});

import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3333";

test("TC13 – Invalid Token Access", async ({ request }) => {
  const res = await request.get(`${BASE_URL}/menu`, {
    headers: {
      Authorization: "Bearer fake.fake.fake",
    },
  });

  expect(res.status()).toBe(401);

  const body = await res.json();

  expect(body.message).toBeDefined();
});

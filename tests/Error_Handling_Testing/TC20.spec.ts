import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3333";

let token: string;

test.beforeAll(async ({ request }) => {
  const loginResponse = await request.post(`${BASE_URL}/auth/login`, {
    data: {
      email: "a1@gmail.com",
      password: "123456789",
    },
  });

  expect(loginResponse.status()).toBe(200);

  const body = await loginResponse.json();
  token = body.access_token;
});

test("TC20 – Invalid JSON Body", async ({ request }) => {
  const invalidJson = `
  {
    "delivery": true,
    "total_price": 120,
    "order_details": [
      {
        "variant_id": "e8a395a0-0576-4535-a083-6f9783b0bbfc",
        "quantity": 2
      }
    `; // intentionally broken JSON (missing ] })

  const res = await request.post(`${BASE_URL}/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: invalidJson,
  });
  const body = await res.json();
  expect(body.statusCode).toBe(400);
});

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

  console.log("Token acquired");
});

test("TC14 – GET /menu Response Time < 1000ms", async ({ request }) => {
  const start = Date.now();

  const response = await request.get(`${BASE_URL}/menu`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const duration = Date.now() - start;

  console.log("TC14 – GET /menu Response Time < 1000ms: ", duration);

  expect(response.status()).toBe(200);
  expect(duration).toBeLessThan(1000);
});

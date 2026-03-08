import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3333";

test("TC9 – Invalid Login Credentials", async ({ request }) => {
  const loginResponse = await request.post(`${BASE_URL}/auth/login`, {
    data: {
      email: "a1@gmail.com",
      password: "wrongpassword",
    },
  });

  expect(loginResponse.status()).toBe(401);
});

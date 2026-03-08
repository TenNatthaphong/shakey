import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3333";

let token: string;

test("TC6 – Login Missing Password", async ({ request }) => {
  const loginResponse = await request.post(`${BASE_URL}/auth/login`, {
    data: {
      email: "a1@gmail.com",
    },
  });

  expect(loginResponse.status()).toBe(400);

  const body = await loginResponse.json();
});

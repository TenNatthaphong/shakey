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

test("TC3 - Get Favorite Menu", async ({ request }) => {
  const res = await request.get(`${BASE_URL}/menu/favorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(res.status()).toBe(200);

  const body = await res.json();

  console.log(body);

  expect(Array.isArray(body)).toBeTruthy();
});

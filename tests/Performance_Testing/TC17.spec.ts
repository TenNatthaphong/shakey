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

test("TC17 – 50 Concurrent Menu Requests", async ({ request }) => {
  const requests = [];

  for (let i = 0; i < 50; i++) {
    requests.push(
      request.get(`${BASE_URL}/menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
  }

  const responses = await Promise.all(requests);

  responses.forEach((res) => {
    expect(res.status()).toBe(200);
  });
});

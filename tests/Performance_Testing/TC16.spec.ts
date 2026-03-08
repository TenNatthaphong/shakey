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

test("TC16 - POST /order 10 concurrent requests", async ({ request }) => {
  const requests = [];

  for (let i = 0; i < 10; i++) {
    requests.push(
      request.post(`${BASE_URL}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          delivery: true,
          total_price: 120,
          order_details: [
            {
              variant_id: "e8a395a0-0576-4535-a083-6f9783b0bbfc",
              quantity: 2,
              sweetness: "Sweet_100",
              price: 60,
              note: "less ice",
              topping_ids: [
                "f2ef04f6-6a43-41af-be90-015f462e7acb",
                "1446bdec-3437-484b-8df1-6c8428fb2a72",
              ],
            },
          ],
        },
      }),
    );
  }

  const responses = await Promise.all(requests);

  responses.forEach((res) => {
    expect(res.status()).toBe(201);
  });
});

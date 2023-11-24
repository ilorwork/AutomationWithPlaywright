// https://playwright.dev/docs/api-testing#writing-api-test
import { test, expect } from "@playwright/test";

const { BASE_URL } = process.env;

test("api get all users req", async ({ request }) => {
  const res = await request.get(`${BASE_URL}/users`);
  const data = await res.json();
  console.log(data);

  expect(res.ok()).toBeTruthy();
  // toContainEqual checks if the expected value is contained in an array.
  expect(data).toContainEqual(
    //The objectContaining matcher checks if the actual object contains all the expected properties.
    expect.objectContaining({
      country: "Israel",
      city: "Jerusalem",
    })
  );
});

test("api post login req", async ({ request }) => {
  const res = await request.post(`${BASE_URL}/users/login`, {
    data: {
      email: "usertest@gmail.com",
      password: "Aa123456",
    },
  });
  const data = await res.json();
  console.log(data);

  expect(res.status()).toEqual(200);
  expect(data).toEqual(
    expect.objectContaining({
      firstName: "User",
      lastName: "Test",
      country: "Israel",
    })
  );
});

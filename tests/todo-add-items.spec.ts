import { expect, test } from "@playwright/test";

const TODO_APP_URL = "https://demo.playwright.dev/todomvc";

test.describe("TodoMVC - adding items", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TODO_APP_URL);
  });

  test("adds a single todo item to the list", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Buy milk");
    await input.press("Enter");

    await expect(page.getByTestId("todo-title")).toHaveText(["Buy milk"]);
    await expect(input).toBeEmpty();
  });

  test("shows the remaining item count after adding multiple items", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    for (const title of ["Write tests", "Review pull request", "Ship release"]) {
      await input.fill(title);
      await input.press("Enter");
    }

    await expect(page.getByTestId("todo-item")).toHaveCount(3);
    await expect(page.getByTestId("todo-count")).toContainText("3 items left");
  });
});

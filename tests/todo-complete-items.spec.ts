import { expect, test } from "@playwright/test";

const TODO_APP_URL = "https://demo.playwright.dev/todomvc";

test.describe("TodoMVC - completing items", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TODO_APP_URL);
    const input = page.getByPlaceholder("What needs to be done?");
    for (const title of ["First task", "Second task"]) {
      await input.fill(title);
      await input.press("Enter");
    }
  });

  test("marks an item as completed", async ({ page }) => {
    const firstItem = page.getByTestId("todo-item").first();
    await firstItem.getByRole("checkbox").check();

    await expect(firstItem).toHaveClass(/completed/);
    await expect(page.getByTestId("todo-count")).toContainText("1 item left");
  });

  test("clears completed items from the list", async ({ page }) => {
    await page.getByTestId("todo-item").first().getByRole("checkbox").check();
    await page.getByRole("button", { name: "Clear completed" }).click();

    await expect(page.getByTestId("todo-item")).toHaveCount(1);
    await expect(page.getByTestId("todo-title")).toHaveText(["Second task"]);
  });
});

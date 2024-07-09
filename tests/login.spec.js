const { test, expect } = require('@playwright/test');

test.describe("LoginForm Component", async () => {
    test("Should render the login form", async ({ page }) => {
        await page.goto("http://localhost:3000/login")
        await expect(page.locator("text = Email Address")).toBeVisible();
        await expect(page.locator('input#email')).toBeVisible();
        await expect(page.locator('text = password')).toBeVisible();
        await expect(page.locator('input#password')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    })
    test('Register here click', async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        await page.click('text=Register');
        await expect(page).toHaveURL('http://localhost:3000/register');
    })
})
const { test, expect, chromium } = require('@playwright/test');

// Create a global variable for the browser instance
// let browser;

// test.beforeAll(async () => {
//     // Launch the browser once before all tests
//     browser = await chromium.launch();
// });

// test.afterAll(async () => {
//     // Close the browser after all tests
//     await browser.close();
// });

test.describe('RegistrationForm Component', () => {
    test('should render the registration form', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await expect(page.locator('text=Email address')).toBeVisible();
        await expect(page.locator('input#email')).toBeVisible();
        await expect(page.locator('input#password')).toBeVisible();
        await expect(page.locator('input#confirmPassword')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('should display error for mismatched passwords', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.fill('input#email', 'test@example.com');
        await page.fill('input#password', 'password');
        await page.fill('input#confirmPassword', 'differentpassword');
        await page.click('button[type="submit"]');
        await expect(page.locator('.alert-danger')).toContainText('Passwords do not match');
    });

    test('should submit the form with valid data', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.fill('input#email', 'test@example.com');
        await page.fill('input#password', 'password');
        await page.fill('input#confirmPassword', 'password');
        await page.click('button[type="submit"]');
        await expect(page.locator('.alert-success')).toHaveText('Registration successful. Redirecting to home page..');
    });

    test('Login here click', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.click('text=Login here');
        await expect(page).toHaveURL('http://localhost:3000/login');
    });

    test('passwords hide with dots', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await expect(page.locator('input#password')).toHaveAttribute('type', 'password');
        await expect(page.locator('input#confirmPassword')).toHaveAttribute('type', 'password');
    });
});

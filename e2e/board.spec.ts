import { test, expect } from '@playwright/test';

test.describe('Board E2E Tests', () => {
  
  test.beforeEach(async ({ context, page }) => {
    await context.setExtraHTTPHeaders({ 'x-test-bypass': 'true' });

    const token = {
      access_token: 'fake-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'fake-refresh-token',
      user: { id: 'test-user-id', email: 'test@example.com' }
    };

    await page.addInitScript((t) => {
      window.localStorage.setItem('sb-dvzuibrnjxanuiqqqbjl-auth-token', JSON.stringify(t));
      // Force language to KO for testing consistency
      window.localStorage.setItem('app-config', JSON.stringify({ state: { language: 'ko' }, version: 0 }));
    }, token);
    
    await page.goto('/dashboard');
    
    let posts = [
      { id: '1', title: 'Mock Post 1', author_name: 'Tester', created_at: new Date().toISOString(), user_id: 'test-user-id', content: '<p>Content</p>' }
    ];

    // 3. Mock Supabase API Requests
    await page.route('**/rest/v1/posts*', async (route) => {
      const method = route.request().method();
      if (method === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(posts)
        });
      } else if (method === 'POST') {
        const body = JSON.parse(route.request().postData() || '{}');
        posts.unshift({ ...body, id: Date.now().toString(), created_at: new Date().toISOString() });
        await route.fulfill({ status: 200, body: '{}' });
      } else if (method === 'DELETE') {
        posts = [];
        await route.fulfill({ status: 200, body: '{}' });
      }
    });

    await page.waitForLoadState('networkidle');
  });

  test('should display dashboard stats and switch themes', async ({ page }) => {
    // 1. Dashboard Stats Check (Korean)
    await expect(page.locator('h1')).toContainText('반갑습니다');
    await page.screenshot({ path: 'e2e-screenshots/dashboard-dark.png' });

    // 2. Switch to Light Mode
    const themeToggle = page.locator('button[title="Toggle Theme"]');
    await themeToggle.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'e2e-screenshots/dashboard-light.png' });
    
    const body = page.locator('body');
    // Light mode background should be white
    await expect(body).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  });

  test('should perform full CRUD flow', async ({ page }) => {
    // 1. Navigate to Issues (이슈)
    await page.click('text=이슈');
    await expect(page).toHaveURL('/board');
    await page.screenshot({ path: 'e2e-screenshots/board-list.png' });

    // 2. Create New Issue (새 이슈 작성)
    await page.click('text=New Issue');
    await expect(page).toHaveURL('/board/write');
    
    const title = `E2E Test Issue ${Date.now()}`;
    await page.fill('[placeholder="Issue title"]', title);
    
    // Quill editor interaction
    await page.locator('.ql-editor').fill('Playwright가 작성한 상세 내용입니다.');
    await page.screenshot({ path: 'e2e-screenshots/board-write.png' });
    
    await page.click('text=Publish Issue');
    
    // Wait for redirection back to list
    await page.waitForURL('/board');
    await expect(page.locator(`text=${title}`)).toBeVisible();

    // 3. View Issue Detail
    await page.click(`text=${title}`);
    await expect(page.locator('h1')).toContainText(title);
    await page.screenshot({ path: 'e2e-screenshots/board-detail.png' });

    // 4. Delete Issue (삭제)
    page.on('dialog', dialog => dialog.accept());
    await page.click('text=Delete');
    await page.waitForURL('/board');
    await expect(page.locator(`text=${title}`)).not.toBeVisible();
    await page.screenshot({ path: 'e2e-screenshots/board-deleted.png' });
  });

  test('should switch language', async ({ page }) => {
    // Current is KO, switch to EN
    await page.click('button:has-text("KO")');
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await page.screenshot({ path: 'e2e-screenshots/lang-en.png' });

    // Switch back to KO
    await page.click('button:has-text("EN")');
    await expect(page.locator('text=대시보드')).toBeVisible();
    await page.screenshot({ path: 'e2e-screenshots/lang-ko.png' });
  });
});

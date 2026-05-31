# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: board.spec.ts >> Board E2E Tests >> should perform full CRUD flow
- Location: e2e/board.spec.ts:66:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation to "/board" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - complementary [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - generic [ref=e8]:
            - generic [ref=e9]: L
            - generic [ref=e10]: Guest
          - navigation [ref=e11]:
            - link "대시보드" [ref=e12] [cursor=pointer]:
              - /url: /dashboard
              - img [ref=e13]
              - generic [ref=e18]: 대시보드
            - link "이슈" [ref=e19] [cursor=pointer]:
              - /url: /board
              - img [ref=e20]
              - generic [ref=e22]: 이슈
            - link "최근 활동" [ref=e23] [cursor=pointer]:
              - /url: /board/write#
              - img [ref=e24]
              - generic [ref=e27]: 최근 활동
          - generic [ref=e28]:
            - paragraph [ref=e29]: 워크스페이스
            - generic [ref=e30]:
              - button "새 프로젝트" [ref=e31]:
                - img [ref=e32]
                - text: 새 프로젝트
              - button "검색" [ref=e34]:
                - img [ref=e35]
                - text: 검색
        - generic [ref=e38]:
          - generic [ref=e39]:
            - button "Toggle Theme" [ref=e40]:
              - img [ref=e41]
            - button "ko" [ref=e47]:
              - img [ref=e48]
              - text: ko
          - button "로그아웃" [ref=e51]:
            - img [ref=e52]
            - generic [ref=e55]: 로그아웃
          - button [ref=e56]:
            - img [ref=e57]
    - main [ref=e59]:
      - generic [ref=e61]:
        - generic [ref=e62]:
          - link "Back to Issues" [ref=e63] [cursor=pointer]:
            - /url: /board
            - img [ref=e64]
            - text: Back to Issues
          - generic [ref=e66]:
            - button "Cancel" [ref=e67]
            - button "Publish Issue" [active] [ref=e68]:
              - img [ref=e69]
              - text: Publish Issue
        - generic [ref=e72]:
          - generic [ref=e73]:
            - generic [ref=e74]:
              - img [ref=e75]
              - generic [ref=e78]: New Draft
            - textbox "Issue title" [ref=e79]: E2E Test Issue 1780228646335
          - generic [ref=e82]:
            - toolbar [ref=e83]:
              - generic [ref=e85]:
                - button "Normal" [ref=e86] [cursor=pointer]:
                  - text: Normal
                  - img [ref=e87]
                - text: Heading 1 Heading 2 Normal
              - generic [ref=e90]:
                - button "bold" [ref=e91] [cursor=pointer]:
                  - img [ref=e92]
                - button "italic" [ref=e95] [cursor=pointer]:
                  - img [ref=e96]
                - button "underline" [ref=e98] [cursor=pointer]:
                  - img [ref=e99]
                - button "strike" [ref=e102] [cursor=pointer]:
                  - img [ref=e103]
              - generic [ref=e107]:
                - 'button "list: ordered" [ref=e108] [cursor=pointer]':
                  - img [ref=e109]
                - 'button "list: bullet" [ref=e113] [cursor=pointer]':
                  - img [ref=e114]
              - generic [ref=e115]:
                - button "link" [ref=e116] [cursor=pointer]:
                  - img [ref=e117]
                - button "blockquote" [ref=e121] [cursor=pointer]:
                  - img [ref=e122]
                - button "code-block" [ref=e127] [cursor=pointer]:
                  - img [ref=e128]
              - button "clean" [ref=e133] [cursor=pointer]:
                - img [ref=e134]
            - generic [ref=e139]:
              - paragraph [ref=e141]: Playwright가 작성한 상세 내용입니다.
              - text: "Visit URL: EditRemove"
        - generic [ref=e142]:
          - generic [ref=e143]:
            - generic [ref=e144]: Markdown supported
            - generic [ref=e145]: Auto-saving enabled
          - paragraph [ref=e146]: Publicly viewable by the community
  - button "Open Next.js Dev Tools" [ref=e152] [cursor=pointer]:
    - img [ref=e153]
  - alert [ref=e156]: /board/write
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Board E2E Tests', () => {
  4   |   
  5   |   test.beforeEach(async ({ context, page }) => {
  6   |     await context.setExtraHTTPHeaders({ 'x-test-bypass': 'true' });
  7   | 
  8   |     const token = {
  9   |       access_token: 'fake-token',
  10  |       token_type: 'bearer',
  11  |       expires_in: 3600,
  12  |       refresh_token: 'fake-refresh-token',
  13  |       user: { id: 'test-user-id', email: 'test@example.com' }
  14  |     };
  15  | 
  16  |     await page.addInitScript((t) => {
  17  |       window.localStorage.setItem('sb-dvzuibrnjxanuiqqqbjl-auth-token', JSON.stringify(t));
  18  |       // Force language to KO for testing consistency
  19  |       window.localStorage.setItem('app-config', JSON.stringify({ state: { language: 'ko' }, version: 0 }));
  20  |     }, token);
  21  |     
  22  |     await page.goto('/dashboard');
  23  |     
  24  |     let posts = [
  25  |       { id: '1', title: 'Mock Post 1', author_name: 'Tester', created_at: new Date().toISOString(), user_id: 'test-user-id', content: '<p>Content</p>' }
  26  |     ];
  27  | 
  28  |     // 3. Mock Supabase API Requests
  29  |     await page.route('**/rest/v1/posts*', async (route) => {
  30  |       const method = route.request().method();
  31  |       if (method === 'GET') {
  32  |         await route.fulfill({
  33  |           status: 200,
  34  |           contentType: 'application/json',
  35  |           body: JSON.stringify(posts)
  36  |         });
  37  |       } else if (method === 'POST') {
  38  |         const body = JSON.parse(route.request().postData() || '{}');
  39  |         posts.unshift({ ...body, id: Date.now().toString(), created_at: new Date().toISOString() });
  40  |         await route.fulfill({ status: 200, body: '{}' });
  41  |       } else if (method === 'DELETE') {
  42  |         posts = [];
  43  |         await route.fulfill({ status: 200, body: '{}' });
  44  |       }
  45  |     });
  46  | 
  47  |     await page.waitForLoadState('networkidle');
  48  |   });
  49  | 
  50  |   test('should display dashboard stats and switch themes', async ({ page }) => {
  51  |     // 1. Dashboard Stats Check (Korean)
  52  |     await expect(page.locator('h1')).toContainText('반갑습니다');
  53  |     await page.screenshot({ path: 'e2e-screenshots/dashboard-dark.png' });
  54  | 
  55  |     // 2. Switch to Light Mode
  56  |     const themeToggle = page.locator('button[title="Toggle Theme"]');
  57  |     await themeToggle.click();
  58  |     await page.waitForTimeout(1000);
  59  |     await page.screenshot({ path: 'e2e-screenshots/dashboard-light.png' });
  60  |     
  61  |     const body = page.locator('body');
  62  |     // Light mode background should be white
  63  |     await expect(body).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  64  |   });
  65  | 
  66  |   test('should perform full CRUD flow', async ({ page }) => {
  67  |     // 1. Navigate to Issues (이슈)
  68  |     await page.click('text=이슈');
  69  |     await expect(page).toHaveURL('/board');
  70  |     await page.screenshot({ path: 'e2e-screenshots/board-list.png' });
  71  | 
  72  |     // 2. Create New Issue (새 이슈 작성)
  73  |     await page.click('text=New Issue');
  74  |     await expect(page).toHaveURL('/board/write');
  75  |     
  76  |     const title = `E2E Test Issue ${Date.now()}`;
  77  |     await page.fill('[placeholder="Issue title"]', title);
  78  |     
  79  |     // Quill editor interaction
  80  |     await page.locator('.ql-editor').fill('Playwright가 작성한 상세 내용입니다.');
  81  |     await page.screenshot({ path: 'e2e-screenshots/board-write.png' });
  82  |     
  83  |     await page.click('text=Publish Issue');
  84  |     
  85  |     // Wait for redirection back to list
> 86  |     await page.waitForURL('/board');
      |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  87  |     await expect(page.locator(`text=${title}`)).toBeVisible();
  88  | 
  89  |     // 3. View Issue Detail
  90  |     await page.click(`text=${title}`);
  91  |     await expect(page.locator('h1')).toContainText(title);
  92  |     await page.screenshot({ path: 'e2e-screenshots/board-detail.png' });
  93  | 
  94  |     // 4. Delete Issue (삭제)
  95  |     page.on('dialog', dialog => dialog.accept());
  96  |     await page.click('text=Delete');
  97  |     await page.waitForURL('/board');
  98  |     await expect(page.locator(`text=${title}`)).not.toBeVisible();
  99  |     await page.screenshot({ path: 'e2e-screenshots/board-deleted.png' });
  100 |   });
  101 | 
  102 |   test('should switch language', async ({ page }) => {
  103 |     // Current is KO, switch to EN
  104 |     await page.click('button:has-text("KO")');
  105 |     await expect(page.locator('text=Dashboard')).toBeVisible();
  106 |     await page.screenshot({ path: 'e2e-screenshots/lang-en.png' });
  107 | 
  108 |     // Switch back to KO
  109 |     await page.click('button:has-text("EN")');
  110 |     await expect(page.locator('text=대시보드')).toBeVisible();
  111 |     await page.screenshot({ path: 'e2e-screenshots/lang-ko.png' });
  112 |   });
  113 | });
  114 | 
```
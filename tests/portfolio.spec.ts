import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	// Vercel serves this endpoint in deployment, not in the local production preview.
	await page.route('**/_vercel/insights/**', (route) => route.fulfill({ body: '' }));
});

test('the evidence board is the default site, with no prototype selector', async ({
	page
}, testInfo) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Alex Amzu', exact: true })).toBeVisible();
	await expect(page.getByRole('img', { name: 'Portrait of Alex Amzu' })).toBeVisible();
	await expect(page.getByRole('main')).toHaveCount(1);
	await expect(page.getByRole('button', { name: 'Next variant' })).toHaveCount(0);
	await expect(page.getByRole('link', { name: 'Resume (PDF)', exact: true })).toHaveAttribute(
		'href',
		'/resume.pdf'
	);
	await page.evaluate(() => document.fonts.ready);
	await expect
		.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
		.toBe(true);
	await page.screenshot({
		path: testInfo.outputPath('portfolio.png'),
		fullPage: true,
		animations: 'disabled'
	});
	expect(errors).toEqual([]);

	await page.goto('/?variant=A');
	await expect(page.getByRole('heading', { name: 'Known postings' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Next variant' })).toHaveCount(0);
});

test('sticky navigation follows the section in view', async ({ page }) => {
	await page.goto('/');
	const navigation = page.getByRole('navigation', { name: 'Board sections' });
	await expect(navigation.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
		'aria-current',
		'location'
	);
	await navigation.getByRole('link', { name: 'Experience', exact: true }).click();
	await expect(page).toHaveURL(/#postings$/);
	await expect(navigation.getByRole('link', { name: 'Experience', exact: true })).toHaveAttribute(
		'aria-current',
		'location'
	);
	await expect(navigation).toBeInViewport();
	await navigation.getByRole('link', { name: 'Testimonials', exact: true }).click();
	await expect(navigation.getByRole('link', { name: 'Testimonials', exact: true })).toHaveAttribute(
		'aria-current',
		'location'
	);
	await navigation.getByRole('link', { name: 'Contact', exact: true }).click();
	await expect(navigation.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute(
		'aria-current',
		'location'
	);
});

test('tools pin related projects and can be cleared by keyboard', async ({ page }) => {
	await page.goto('/');
	const svelte = page.getByRole('button', { name: 'Svelte, used in 2 projects' });
	await svelte.click();
	await page.mouse.move(0, 0);
	await expect(svelte).toHaveAttribute('aria-pressed', 'true');
	await expect(page.locator('[aria-live="polite"]')).toContainText('SnoopieChat, Bug Bounty Bank');
	await expect(page.locator('[data-pin="p1"]')).toHaveAttribute('data-lit', 'true');
	await expect(page.locator('[data-pin="p0"]')).toHaveAttribute('data-dim', 'true');
	await expect(page.locator('[data-pin="p0"]')).toHaveCSS('opacity', '0.55');
	await expect(svelte).toHaveCSS('background-color', 'rgb(179, 18, 31)');
	await page.keyboard.press('Escape');
	await expect(svelte).toHaveAttribute('aria-pressed', 'false');
	await expect(page.locator('[data-pin="p0"]')).toHaveAttribute('data-dim', 'false');
	await svelte.focus();
	await page.keyboard.press('Enter');
	await expect(svelte).toHaveAttribute('aria-pressed', 'true');
	await page.keyboard.press('Enter');
	await expect(svelte).toHaveAttribute('aria-pressed', 'false');
});

test('NATO has only a classified placeholder, never hidden description text', async ({ page }) => {
	await page.goto('/');
	const nato = page
		.locator('#postings li')
		.filter({ has: page.getByRole('heading', { name: 'NATO', exact: true }) });
	await expect(nato).toContainText('Full Stack Engineer Intern');
	await expect(nato).toContainText('Mar 2026 - Aug 2026');
	await expect(nato.locator('.classified-stamp')).toHaveText('CLASSIFIED');
	await expect(nato.locator('.blackout')).toHaveText('');
	await expect(nato.locator('.desc')).toHaveCount(0);
});

test('small phones do not overflow and keep all navigation labels visible', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 740 });
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true
	);
	const links = page.getByRole('navigation').getByRole('link');
	await expect(links).toHaveCount(4);
	for (const link of await links.all()) {
		await expect(link).toBeInViewport();
	}
});

test('strings render on desktop and respect reduced motion', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	const strings = page.locator('.strings path');
	await expect.poll(() => strings.count()).toBeGreaterThan(0);
	await expect(strings.first()).toHaveCSS('animation-name', 'none');
	await page.setViewportSize({ width: 768, height: 1024 });
	await expect(strings).toHaveCount(0);
	await page.setViewportSize({ width: 1440, height: 900 });
	await expect.poll(() => strings.count()).toBeGreaterThan(0);
});

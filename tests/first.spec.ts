        import { test, expect } from '@playwright/test';
        import allData from '../fixtures/testData.json';

        import { fillOperationOverview } from './helpers/operation_overview';
        import { fillEventDetail } from './helpers/event_detail';
        import { fillAction_Needs } from './helpers/action_needs';
        import { fillOperation } from './helpers/operation';
        import { fillOperationalTimeframesAndContacts } from './helpers/otac';
        import { apiAssertions } from './helpers/apiassertions';

        const scenarios = [
        { name: 'positive', data: allData.positive },
        { name: 'negative', data: allData.negative },
        ];

        test.describe('Form Validation', () => {

        for (const { name, data } of scenarios) {
                test(`Login and submit form - ${name} path`, async ({ page }) => {

                async function clickRole(role: string, name: string) {
                        await page.getByRole(role as any, { name }).click();
                }
                async function locatorFill(name: string, value: string) {
                        await page.locator(`[name="${name}"]`).fill(value);
                }

                // LOGIN - always uses positive data
                await page.goto('https://alpha-3.ifrc-go.dev.togglecorp.com/');
                await clickRole('link', allData.positive.operation_overview.login);
                await locatorFill('username', process.env.TEST_EMAIL!);
                await locatorFill('password', process.env.TEST_PASSWORD!);
                await clickRole('button', allData.positive.operation_overview.login);
                        await page.waitForTimeout(1000);

                await fillOperationOverview(page, data);
                await fillEventDetail(page, data);
                await fillAction_Needs(page, data);
                await fillOperation(page, data);

                // interceptor 
                // const responsePromise = page.waitForResponse(
                // response =>
                //         response.url().includes('/api/v2/dref/') &&
                //         response.request().method() === 'POST'
                // );

                await fillOperationalTimeframesAndContacts(page, data);

                // capture response
                // const response = await responsePromise;
                // const body = await response.json();
                // console.log(JSON.stringify(body, null, 2));


                // await apiAssertions(page, data, response, body);
                });
        }
        });
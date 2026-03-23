        import { expect, Page } from '@playwright/test';

        export async function fillAction_Needs(page: Page, testData: any) {

                                async function clickRole(role : string,name:string) {
                                await page.getByRole(role as any, { name: name }).click();
                        }    
                                async function locatorClick(fieldName: string) {
                                await page.locator(`[name="${fieldName}"]`).click();
                        }   
                                async function locatorFill( name: string, value: string) {
                                await page.locator(`[name="${name}"]`).fill(value);
                        }

                const negAssert = testData.action_needs.negative_assertions;

                // ACTION/NEEDS SECTION
                                await page.getByText(testData.operation_overview.no, { exact: true }).nth(0).click();
                                await page.getByText(testData.operation_overview.yes, { exact: true }).nth(0).click();
                                await locatorClick('ns_respond_date');
                                await locatorFill('ns_respond_date', testData.action_needs.date1);
                                await expect(page.locator('[name="ns_respond_date"]')).toHaveValue(testData.action_needs.date1);
                                await page.getByRole('button', { name: testData.action_needs.open }).nth(1).click();
                                await clickRole('button',testData.action_needs.health);
                                await clickRole('button',testData.action_needs.add);
                                await page.locator('[name="description"]').nth(1).fill(testData.action_needs.health_value);
                                await expect(page.locator('[name="description"]').nth(1)).toHaveValue(testData.action_needs.health_value);
                                await page.getByRole('button', { name: testData.action_needs.open }).nth(1).click();

                        // NEGATIVE ASSERTION - description 
                                if (negAssert?.neg_flag) {
                                await page.locator('[name="description"]').nth(1).clear();
                                await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                await page.locator('[name="description"]').nth(1).fill(testData.action_needs.health_value);
                                await expect(page.locator('[name="description"]').nth(1)).toHaveValue(testData.action_needs.health_value);
                                }

                                await clickRole('button',testData.action_needs.education);
                                await clickRole('button',testData.action_needs.add);
                                await page.locator('[name="description"]').nth(2).fill(testData.action_needs.education_value);
                                await expect(page.locator('[name="description"]').nth(2)).toHaveValue(testData.action_needs.education_value);
                                await page.getByRole('button', { name: testData.action_needs.remove }).nth(1).click();
                                await locatorFill('ifrc', testData.action_needs.IFRC);
                                await expect(page.locator('[name="ifrc"]')).toHaveValue(testData.action_needs.IFRC);
                                await locatorFill('partner_national_society', testData.action_needs.test_description);
                                await expect(page.locator('[name="partner_national_society"]')).toHaveValue(testData.action_needs.test_description);
                                await locatorFill('icrc', testData.action_needs.ICRC);
                                await expect(page.locator('[name="icrc"]')).toHaveValue(testData.action_needs.ICRC);
                                await page.getByText(testData.action_needs.no, { exact: true }).nth(1).click();
                                await page.getByText(testData.action_needs.yes, { exact: true }).nth(1).click();
                                await locatorFill('national_authorities', testData.action_needs.test_description);
                                await expect(page.locator('[name="national_authorities"]')).toHaveValue(testData.action_needs.test_description);
                                await locatorFill('un_or_other_actor', testData.action_needs.test_description);
                                await expect(page.locator('[name="un_or_other_actor"]')).toHaveValue(testData.action_needs.test_description);
                                await page.getByText(testData.action_needs.no, { exact: true }).nth(2).click();
                                await page.getByText(testData.action_needs.yes, { exact: true }).nth(2).click();
                                await locatorFill('major_coordination_mechanism', testData.action_needs.test_description);
                                await expect(page.locator('[name="major_coordination_mechanism"]')).toHaveValue(testData.action_needs.test_description);

                                await page.getByText('About GO').click();
                                await clickRole('button', testData.operation.continue);
        }
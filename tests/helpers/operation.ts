        import { expect, Page } from '@playwright/test';

        export async function fillOperation(page: Page, testData: any) {

                                async function clickRole(role : string,name:string) {
                                await page.getByRole(role as any, { name: name }).click();
                        }    
                                async function locatorClick(fieldName: string) {
                                await page.locator(`[name="${fieldName}"]`).click();
                        }   
                                async function locatorFill( name: string, value: string) {
                                await page.locator(`[name="${name}"]`).fill(value);
                        }

                const negAssert = testData.operation.negative_assertions;

                //  reusable function for negative number assertion
                                async function assertNegativeNumber(fieldName: string) {
                                await locatorFill(fieldName, '-5');
                                await expect(page.getByText('The field must be a positive number without decimal').nth(0)).toBeVisible();
                                }

                //  reusable function for percentage range assertion
                                async function assertPercentageRange(fieldName: string) {
                                await locatorFill(fieldName, '-5');
                                await expect(page.getByText('The field must be greater than or equal to 0').nth(0)).toBeVisible();
                                await locatorFill(fieldName, '110');
                                await expect(page.getByText('The field must be smaller than or equal to 100').nth(0)).toBeVisible();
                                }

                // OPERATION SECTION
                                await locatorFill('operation_objective', testData.operation.test_description);
                                await expect(page.locator('[name="operation_objective"]')).toHaveValue(testData.operation.test_description);
                                await locatorFill('response_strategy', testData.operation.test_description);
                                await expect(page.locator('[name="response_strategy"]')).toHaveValue(testData.operation.test_description);
                                await locatorFill('people_assisted', testData.operation.test_description);
                                await expect(page.locator('[name="people_assisted"]')).toHaveValue(testData.operation.test_description);
                                await locatorFill('selection_criteria', testData.operation.test_description);
                                await expect(page.locator('[name="selection_criteria"]')).toHaveValue(testData.operation.test_description);

                                //File Upload
                                const fileInput_OPRTN = page.locator('input[type="file"]').nth(0);
                                await expect (fileInput_OPRTN).toBeEnabled();
                                await fileInput_OPRTN.setInputFiles("C:\\Users\\appus\\Downloads\\blank.pdf");

                                await locatorFill('total_targeted_population', testData.operation.total_targeted_population);
                                await expect(page.locator('[name="total_targeted_population"]')).toHaveValue(testData.operation.total_targeted_population);

                        // NEGATIVE ASSERTION  total_targeted_population
                                if (negAssert?.neg_flag) {
                                await assertNegativeNumber('total_targeted_population');
                                await locatorFill('total_targeted_population', testData.operation.total_targeted_population);
                                }
                                await locatorFill('disability_people_per', testData.operation.disability_people_per);
                                await expect(page.locator('[name="disability_people_per"]')).toHaveValue(testData.operation.disability_people_per);
                        
                        // NEGATIVE ASSERTION - disability_people_per
                                if (negAssert?.neg_flag) {
                                        await locatorFill('disability_people_per', '-5');
                                        await expect(page.getByText('The field must be greater than or equal to 0').nth(0)).toBeVisible();
                                        await locatorFill('disability_people_per', testData.operation.disability_people_per);
                                }

                                await locatorFill('people_per_urban', testData.operation.people_per_urban);
                                await expect(page.locator('[name="people_per_urban"]')).toHaveValue(testData.operation.people_per_urban);
                        
                        // NEGATIVE ASSERTION - people_per_urban
                                if (negAssert?.neg_flag) {
                                await assertPercentageRange('people_per_urban');
                                await locatorFill('people_per_urban', testData.operation.people_per_urban);
                                }

                                await locatorFill('people_per_local', testData.operation.people_per_local);
                                await expect(page.locator('[name="people_per_local"]')).toHaveValue(testData.operation.people_per_local);
                        
                        // NEGATIVE ASSERTION - people_per_local
                                if (negAssert?.neg_flag) {
                                await assertPercentageRange('people_per_local');
                                await locatorFill('people_per_local', testData.operation.people_per_local);
                                }

                                await locatorFill('displaced_people', testData.operation.displaced_people);
                                await expect(page.locator('[name="displaced_people"]')).toHaveValue(testData.operation.displaced_people);
                        
                        // NEGATIVE ASSERTION - displaced_people
                                if (negAssert?.neg_flag) {
                                await locatorFill('displaced_people', '-5');
                                await expect(page.getByText('The field must be a positive number without decimal').nth(0)).toBeVisible();
                                await locatorFill('displaced_people', testData.operation.displaced_people);
                                }

                                await page.getByText(testData.operation.no, { exact: true }).nth(0).click();
                                await page.getByText(testData.operation.yes, { exact: true }).nth(0).click();
                                await page.getByText(testData.operation.no, { exact: true }).nth(1).click();
                                await page.getByText(testData.operation.yes, { exact: true }).nth(1).click();
                                await page.getByText(testData.operation.no, { exact: true }).nth(2).click();
                                await page.getByText(testData.operation.yes, { exact: true }).nth(2).click();
                                await page.getByText(testData.operation.no, { exact: true }).nth(3).click();
                                await page.getByText(testData.operation.yes, { exact: true }).nth(3).click();
                                await page.getByText(testData.operation.no, { exact: true }).nth(4).click();
                                await page.getByText(testData.operation.yes, { exact: true }).nth(4).click();
                                await clickRole('button',testData.operation.risk);
                                await locatorFill('risk', testData.operation.risk1);
                                await locatorFill('mitigation', testData.operation.mitigation1);
                                await expect(page.locator('[name="risk"]')).toHaveValue(testData.operation.risk1);
                                await expect(page.locator('[name="mitigation"]')).toHaveValue(testData.operation.mitigation1);

                                await page.getByText('Please indicate any security and safety concerns for this operation').click();

                                await clickRole('button',testData.operation.risk);
                                await page.locator('[name="risk"]').nth(1).fill(testData.operation.risk2);
                                await page.locator('[name="mitigation"]').nth(1).fill(testData.operation.mitigation2);
                                await expect(page.locator('[name="risk"]').nth(1)).toHaveValue(testData.operation.risk2);
                                await expect(page.locator('[name="mitigation"]').nth(1)).toHaveValue(testData.operation.mitigation2);
                                await page.getByRole('button', { name: testData.operation.deleterisk }).nth(1).click();
                                await locatorFill('risk_security_concern', testData.operation.test_description);
                                await expect(page.locator('[name="risk_security_concern"]')).toHaveValue(testData.operation.test_description);

                        //  NEGATIVE ASSERTION - risk_security_concern
                                if (negAssert?.neg_flag) {
                                await page.locator('[name="risk"]').clear();
                                await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                await locatorFill('risk', testData.operation.test_description);
                                await expect(page.locator('[name="risk_security_concern"]')).toHaveValue(testData.operation.test_description);
                                }

                        //  NEGATIVE ASSERTION - mitigation
                                if (negAssert?.neg_flag) {
                                await page.locator('[name="mitigation"]').nth(0).clear();
                                await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                await locatorFill('mitigation', testData.operation.mitigation1);
                                await expect(page.locator('[name="mitigation"]').nth(0)).toHaveValue(testData.operation.mitigation1);
                                }

                                await page.getByText(testData.operation.no, { exact: true }).nth(5).click();
                                await page.getByText(testData.operation.yes, { exact: true }).nth(5).click();

                                //File Upload
                                const fileInput_OPRTN1 = page.locator('input[type="file"]').nth(1);
                                await expect (fileInput_OPRTN1).toBeEnabled();
                                await fileInput_OPRTN1.setInputFiles("C:\\Users\\appus\\Downloads\\blank.pdf");

                                await locatorFill('amount_requested', testData.operation.amount_requested);
                                await expect(page.locator('[name="amount_requested"]')).toHaveValue(testData.operation.amount_requested);
                                await page.getByText(testData.operation.select_intervention).click();
                                await page.getByRole('textbox').nth(8).click();
                                await clickRole('button',testData.operation.health_value);
                                await page.getByRole('button', { name: testData.operation.add }).nth(1).click();
                                await locatorFill('budget', testData.operation.budget_value);
                                await expect(page.locator('[name="budget"]')).toHaveValue(testData.operation.budget_value);
                                await locatorFill('person_targeted', testData.operation.person_targeted);
                                await expect(page.locator('[name="person_targeted"]')).toHaveValue(testData.operation.person_targeted);
                                await page.locator('[name="description"]').nth(1).fill(testData.operation.test_description);
                                await clickRole('button',testData.operation.add_indicator);
                                await locatorFill('title', testData.operation.test_description);
                                await expect(page.locator('[name="title"]')).toHaveValue(testData.operation.test_description);
                                await locatorFill('target', testData.operation.target);
                                await expect(page.locator('[name="target"]')).toHaveValue(testData.operation.target);
                                await locatorFill('human_resource', testData.operation.test_description);
                                await expect(page.locator('[name="human_resource"]')).toHaveValue(testData.operation.test_description);
                                await locatorFill('is_volunteer_team_diverse', testData.operation.test_description);
                                await expect(page.locator('[name="is_volunteer_team_diverse"]')).toHaveValue(testData.operation.test_description);
                                await page.getByText(testData.operation.no, { exact: true }).nth(6).click();
                                await page.getByText(testData.operation.yes, { exact: true }).nth(6).click();
                                await locatorFill('surge_personnel_deployed', testData.operation.test_description);
                                await expect(page.locator('[name="surge_personnel_deployed"]')).toHaveValue(testData.operation.test_description);
                                await clickRole('button',testData.operation.continue);
        }
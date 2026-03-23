        import { expect, Page } from '@playwright/test';

        export async function fillEventDetail(page: Page, testData: any) {

                                async function clickRole(role : string,name:string) {
                                await page.getByRole(role as any, { name: name }).click();
                        }    
                                async function locatorClick(fieldName: string) {
                                await page.locator(`[name="${fieldName}"]`).click();
                        }   
                                async function locatorFill( name: string, value: string) {
                                await page.locator(`[name="${name}"]`).fill(value);
                        }

                const negAssert = testData.event_detail.negative_assertions;

                //   reusable function for negative number assertion
                                async function assertNegativeNumber(fieldName: string, correctValue: string) {
                                await locatorFill(fieldName, '-5');
                                await expect(page.getByText('The field must be a positive number without decimal').nth(0)).toBeVisible();
                                await locatorFill(fieldName, correctValue);
                                await expect(page.locator(`[name="${fieldName}"]`)).toHaveValue(correctValue);
                                }

                // EVENT DETAIL SECTION
                                await locatorClick('event_date');
                                await locatorFill('event_date', testData.event_detail.date1);
                                await expect(page.locator('[name="event_date"]')).toHaveValue(testData.event_detail.date1);
                                await locatorFill('num_affected', testData.event_detail.num_affected);
                                await expect(page.locator('[name="num_affected"]')).toHaveValue(testData.event_detail.num_affected);
                                if (negAssert?.neg_flag) {
                                await assertNegativeNumber('num_affected', testData.event_detail.num_affected);
                                }

                                await locatorFill('people_in_need', testData.event_detail.people_in_need);
                                await expect(page.locator('[name="people_in_need"]')).toHaveValue(testData.event_detail.people_in_need);

                                await locatorFill('estimated_number_of_affected_male', testData.event_detail.estimated_number_of_affected_male);
                                await expect(page.locator('[name="estimated_number_of_affected_male"]')).toHaveValue(testData.event_detail.estimated_number_of_affected_male);

                                if (negAssert?.neg_flag) {
                                await assertNegativeNumber('estimated_number_of_affected_male', testData.event_detail.estimated_number_of_affected_male);
                                }

                                await locatorFill('estimated_number_of_affected_female', testData.event_detail.estimated_number_of_affected_female);
                                await expect(page.locator('[name="estimated_number_of_affected_female"]')).toHaveValue(testData.event_detail.estimated_number_of_affected_female);

                                if (negAssert?.neg_flag) {
                                await assertNegativeNumber('estimated_number_of_affected_female', testData.event_detail.estimated_number_of_affected_female);
                                }

                                await locatorFill('estimated_number_of_affected_girls_under_18', testData.event_detail.estimated_number_of_affected_girls_under_18);
                                await expect(page.locator('[name="estimated_number_of_affected_girls_under_18"]')).toHaveValue(testData.event_detail.estimated_number_of_affected_girls_under_18);

                                if (negAssert?.neg_flag) {
                                await assertNegativeNumber('estimated_number_of_affected_girls_under_18', testData.event_detail.estimated_number_of_affected_girls_under_18);
                                }

                                await locatorFill('estimated_number_of_affected_boys_under_18', testData.event_detail.estimated_number_of_affected_boys_under_18);
                                await expect(page.locator('[name="estimated_number_of_affected_boys_under_18"]')).toHaveValue(testData.event_detail.estimated_number_of_affected_boys_under_18);

                                if (negAssert?.neg_flag) {
                                await assertNegativeNumber('estimated_number_of_affected_boys_under_18', testData.event_detail.estimated_number_of_affected_boys_under_18);
                                }

                                await locatorFill('event_description', testData.event_detail.test_description);
                                await expect(page.locator('[name="event_description"]')).toHaveValue(testData.event_detail.test_description);
                                await clickRole('button', testData.event_detail.new_source);
                                await locatorFill('source_name', testData.event_detail.test_description);
                                await locatorFill('source_link', testData.event_detail.test_link);
                                await clickRole('button',testData.event_detail.new_source);
                                await page.locator('[name="source_name"]').nth(1).fill(testData.event_detail.test_description);
                                await page.locator('[name="source_link"]').nth(1).fill(testData.event_detail.test_link);
                                await clickRole('button', testData.event_detail.new_source);
                                await page.locator('[name="source_name"]').nth(2).fill(testData.event_detail.test_description);
                                await page.locator('[name="source_link"]').nth(2).fill(testData.event_detail.test_link);
                                await page.getByRole('button', { name: testData.event_detail.delete_source}).nth(2).click();
                                await page.getByRole('button', { name: testData.event_detail.delete_source }).nth(1).click();
                                await expect(page.locator('[name="source_name"]')).toHaveValue(testData.event_detail.test_description);
                                await expect(page.locator('[name="source_link"]')).toHaveValue(testData.event_detail.test_link);

                        // NEGATIVE ASSERTION - source_name
                                if (negAssert?.neg_flag) {
                                await page.locator('[name="source_name"]').clear();
                                await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                await locatorFill('source_name', testData.event_detail.test_description);
                                await expect(page.locator('[name="source_name"]')).toHaveValue(testData.event_detail.test_description);
                                }

                        //  NEGATIVE ASSERTION - source_link
                                if (negAssert?.neg_flag) {
                                await page.locator('[name="source_link"]').clear();
                                await locatorFill('source_link', 'not a url');
                                await expect(page.getByText('The field must be a valid url').nth(0)).toBeVisible();
                                await locatorFill('source_link', testData.event_detail.test_link);
                                await expect(page.locator('[name="source_link"]')).toHaveValue(testData.event_detail.test_link);
                                }

                        //File Upload
                                const fileInput_ED = page.locator('input[type="file"]');
                                await expect (fileInput_ED).toBeEnabled();
                                await fileInput_ED.setInputFiles("C:\\Users\\appus\\Downloads\\earthquake.jpeg");
                                await locatorFill('0', testData.operation_overview.caption);

                        //File Upload
                                const fileInput_ED1 = page.locator('input[type="file"]');
                                await expect (fileInput_ED1).toBeEnabled();
                                await fileInput_ED1.setInputFiles("C:\\Users\\appus\\Downloads\\earthquake.jpeg");
                                await locatorFill('1', testData.operation_overview.caption);
                                await page.getByRole('button', { name: testData.event_detail.remove }).nth(1).click();
                                await expect(page.locator('[name="0"]')).toHaveValue(testData.operation_overview.caption);
                                await clickRole('button', testData.operation.continue);
        }
        import { expect, Page } from '@playwright/test';

        export async function fillOperationalTimeframesAndContacts(page: Page, testData: any) {

                                async function clickRole(role : string,name:string) {
                                await page.getByRole(role as any, { name: name }).click();
                        }    
                                async function locatorClick(fieldName: string) {
                                await page.locator(`[name="${fieldName}"]`).click();
                        }   
                                async function locatorFill( name: string, value: string) {
                                await page.locator(`[name="${name}"]`).fill(value);
                        }
                                async function fourfields(name: string,title: string,email: string , phone: string) {
                                await page.locator(`[name="${name}"]`).fill(testData.otac.test_description);
                                await expect(page.locator(`[name="${name}"]`)).toHaveValue(testData.otac.test_description);
                                await page.locator(`[name="${title}"]`).fill(testData.otac.title_description);
                                await expect(page.locator(`[name="${title}"]`)).toHaveValue(testData.otac.title_description);
                                await page.locator(`[name="${email}"]`).fill(testData.otac.test_link);
                                await expect(page.locator(`[name="${email}"]`)).toHaveValue(testData.otac.test_link);
                                await page.locator(`[name="${phone}"]`).fill(testData.otac.test_phone);
                                await expect(page.locator(`[name="${phone}"]`)).toHaveValue(testData.otac.test_phone);
                        }
                const negAssert = testData.otac.negative_assertions;

                //  reusable function for invalid email assertion
                                async function assertInvalidEmail(emailFieldName: string) {
                                await page.locator(`[name="${emailFieldName}"]`).clear();
                                await locatorFill(emailFieldName, 'not a url');
                                await expect(page.getByText('The field must be a valid email').nth(0)).toBeVisible();
                                }
                // OPERATIONAL TIMEFRAMES AND CONTACTS SECTION
                                await locatorClick('ns_request_date');
                                await locatorFill('ns_request_date', testData.otac.date1);
                                await expect(page.locator('[name="ns_request_date"]')).toHaveValue(testData.otac.date1);
                                await locatorClick('submission_to_geneva');
                                await locatorFill('submission_to_geneva', testData.otac.date2);
                                await expect(page.locator('[name="submission_to_geneva"]')).toHaveValue(testData.otac.date2);
                                await locatorClick('date_of_approval');
                                await locatorFill('date_of_approval', testData.otac.date3);
                                await expect(page.locator('[name="date_of_approval"]')).toHaveValue(testData.otac.date3);
                                await locatorFill('operation_timeframe', testData.otac.operation_timeframe_value);
                                await expect(page.locator('[name="operation_timeframe"]')).toHaveValue(testData.otac.operation_timeframe_value);
                                await locatorClick('publishing_date');
                                await locatorFill('publishing_date', testData.otac.date4);
                                await expect(page.locator('[name="publishing_date"]')).toHaveValue(testData.otac.date4);
                                await locatorFill('appeal_code', testData.otac.appeal_code_value);
                                await expect(page.locator('[name="appeal_code"]')).toHaveValue(testData.otac.appeal_code_value);
                                await locatorFill('glide_code', testData.otac.glide_code_value);
                                await expect(page.locator('[name="glide_code"]')).toHaveValue(testData.otac.glide_code_value);
                                await fourfields('ifrc_appeal_manager_name', 'ifrc_appeal_manager_title', 'ifrc_appeal_manager_email', 'ifrc_appeal_manager_phone_number');

                // NEGATIVE ASSERTION - ifrc_appeal_manager_email
                                if (negAssert?.neg_flag) {
                                await assertInvalidEmail('ifrc_appeal_manager_email');
                                }
                                await fourfields('ifrc_project_manager_name', 'ifrc_project_manager_title', 'ifrc_project_manager_email', 'ifrc_project_manager_phone_number');

                //  NEGATIVE ASSERTION - ifrc_project_manager_email
                                if (negAssert?.neg_flag) {
                                await assertInvalidEmail('ifrc_project_manager_email');
                                }
                                await fourfields('national_society_contact_name', 'national_society_contact_title', 'national_society_contact_email', 'national_society_contact_phone_number');

                // NEGATIVE ASSERTION - national_society_contact_email
                                if (negAssert?.neg_flag) {
                                await assertInvalidEmail('national_society_contact_email');
                                }
                                await fourfields('ifrc_emergency_name', 'ifrc_emergency_title', 'ifrc_emergency_email', 'ifrc_emergency_phone_number');

                // NEGATIVE ASSERTION - ifrc_emergency_email
                                if (negAssert?.neg_flag) {
                                await assertInvalidEmail('ifrc_emergency_email');
                                }
                                await fourfields('regional_focal_point_name', 'regional_focal_point_title', 'regional_focal_point_email', 'regional_focal_point_phone_number');

                // NEGATIVE ASSERTION - regional_focal_point_email
                                if (negAssert?.neg_flag) {
                                await assertInvalidEmail('regional_focal_point_email');
                                }
                                await fourfields('media_contact_name', 'media_contact_title', 'media_contact_email', 'media_contact_phone_number');

                // NEGATIVE ASSERTION - media_contact_email
                                if (negAssert?.neg_flag) {
                                await assertInvalidEmail('media_contact_email');
                                }
                                await fourfields('national_society_integrity_contact_name', 'national_society_integrity_contact_title', 'national_society_integrity_contact_email', 'national_society_integrity_contact_phone_number');

                // NEGATIVE ASSERTION - national_society_integrity_contact_email
                                if (negAssert?.neg_flag) {
                                await assertInvalidEmail('national_society_integrity_contact_email');
                                }
                                await locatorFill('national_society_hotline_phone_number', testData.otac.national_society_hotline_phone_number);
                                await expect(page.locator('[name="national_society_hotline_phone_number"]')).toHaveValue(testData.otac.national_society_hotline_phone_number);

                                if (negAssert?.neg_flag) {
                                await page.getByRole('button', { name:testData.otac.save }).nth(1).click();
                                await expect(page.getByText('Please correct all the errors before submission!').nth(0)).toBeVisible();
                                }

        }
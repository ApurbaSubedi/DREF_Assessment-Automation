        import { expect, Page } from '@playwright/test';

        export async function fillOperationOverview(page: Page, testData: any) {

                                async function clickRole(role : string,name:string) {
                                await page.getByRole(role as any, { name: name }).click();
                        }    
                                async function locatorClick(fieldName: string) {
                                await page.locator(`[name="${fieldName}"]`).click();
                        }   
                                async function locatorFill( name: string, value: string) {
                                await page.locator(`[name="${name}"]`).fill(value);
                        }

                const negAssert = testData.operation_overview.negative_assertions;

                //OPERATION OVERVIEW SECTION 
                                await clickRole('button',testData.operation_overview.report_create);
                                await clickRole('link',testData.operation_overview.newDREF);
                                await locatorClick('type_of_dref');
                                await clickRole('button',testData.operation_overview.drefType);
                                await expect(page.getByRole('heading',{name:testData.operation_overview.sharing})).toBeVisible();
                                await expect(page.getByRole('button',{name:testData.operation_overview.add})).toBeDisabled();
                                await locatorClick('national_society');
                                await locatorFill('national_society', 'Nep');
                                await clickRole('button',testData.operation_overview.national_society);
                                await expect(page.locator('[name="national_society"]')).toHaveValue(testData.operation_overview.national_society);

                        //  NEGATIVE ASSERTION - National Society
                                if (negAssert?.neg_flag) {
                                await page.getByRole('button', { name: 'Clear' }).nth(0).click();
                                await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                await locatorClick('national_society');
                                await locatorFill('national_society', 'Nep');
                                await clickRole('button', testData.operation_overview.national_society);
                                await expect(page.locator('[name="national_society"]')).toHaveValue(testData.operation_overview.national_society);
                                }

                                await page.locator(`[placeholder="${testData.operation_overview.placeholder}"]`).click();
                                await clickRole('button',testData.operation_overview.placeholder_value);
                                await clickRole('button',testData.operation_overview.copy);

                        //NEW RADIO BUTTONS APPEAR FOR FIRE, FLOOD, PLUVIAL/FLASHFLOOD
                                await locatorClick('disaster_type');
                                await clickRole('button',testData.operation_overview.fire);
                                await expect(page.locator('[name="disaster_type"]')).toHaveValue(testData.operation_overview.fire);        
                                await page.getByText(testData.operation_overview.no, { exact: true }).nth(0).click();
                                await page.getByText(testData.operation_overview.yes, { exact: true }).nth(0).click();
                                await expect(page.getByText(testData.operation_overview.man_made_event)).toBeVisible();
                                await locatorClick('disaster_type');
                                await clickRole('button',testData.operation_overview.coldwave);
                                await expect(page.locator('[name="disaster_type"]')).toHaveValue(testData.operation_overview.coldwave);
                                await locatorClick('type_of_onset');
                                await clickRole('button',testData.operation_overview.sudden);
                                await expect(page.locator('[name="type_of_onset"]')).toHaveValue(testData.operation_overview.sudden);

                        //  NEGATIVE ASSERTION - Type of Onset
                                if (negAssert?.neg_flag) {
                                await page.getByRole('button', { name: 'Clear' }).nth(3).click();
                                await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                await locatorClick('type_of_onset');
                                await clickRole('button', testData.operation_overview.sudden);
                                await expect(page.locator('[name="type_of_onset"]')).toHaveValue(testData.operation_overview.sudden);
                                }

                                await locatorClick('disaster_category');
                                await clickRole('button',testData.operation_overview.yellow);
                                await expect(page.locator('[name="disaster_category"]')).toHaveValue("Yellow");
                                await locatorClick('disaster_category');
                                await clickRole('button',testData.operation_overview.red);
                                await expect(page.locator('[name="disaster_category"]')).toHaveValue(testData.operation_overview.red);
                                await expect(page.getByRole('heading',{name: testData.operation_overview.crisis_categorization })).toBeVisible();

                        //FILE UPLOAD
                                const fileInput = page.locator('input[type="file"]').nth(0);
                                await expect (fileInput).toBeEnabled();
                                await fileInput.setInputFiles('C:\\Users\\appus\\Downloads\\earthquake.jpeg');
                                await expect(page.locator('[name="country"]')).toHaveValue(testData.operation_overview.nepal);                
                                await locatorClick('district');
                                await page.getByTitle('Select All').click();
                                await page.getByText(testData.operation_overview.affected_country).click();
                                await expect(page.locator('[name="district"]')).toHaveValue(testData.operation_overview.regions);
                                await locatorFill('title', testData.operation_overview.title);
                                await expect(page.locator('[name="title"]')).toHaveValue(testData.operation_overview.title);

                        //  NEGATIVE ASSERTION - Title
                                if (negAssert?.neg_flag) {
                                await page.locator('[name="title"]').clear();
                                await locatorFill('title', '   ');
                                await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                await locatorFill('title', testData.operation_overview.title);
                                await expect(page.locator('[name="title"]')).toHaveValue(testData.operation_overview.title);
                                }

                                await page.getByText(testData.operation_overview.no, { exact: true }).click();
                                await page.getByText(testData.operation_overview.yes, { exact: true }).click();

                        // File Upload
                                const fileInput1 = page.locator('input[type="file"]').nth(1);
                                await expect (fileInput1).toBeEnabled();
                                await fileInput1.setInputFiles("C:\\Users\\appus\\Downloads\\earthquake.jpeg");
                                await page.locator('[name="caption"]').nth(0).fill(testData.operation_overview.caption);
                                await expect(page.locator('[name="caption"]').nth(0)).toHaveValue(testData.operation_overview.caption);

                        //File Upload
                                const fileInput2 = page.locator('input[type="file"]').nth(2);
                                await expect (fileInput2).toBeEnabled();
                                await fileInput2.setInputFiles("C:\\Users\\appus\\Downloads\\earthquake.jpeg");
                                await page.locator('[name="caption"]').nth(1).fill(testData.operation_overview.caption);
                                await expect(page.locator('[name="caption"]').nth(1)).toHaveValue(testData.operation_overview.caption);
                                await clickRole('button', testData.operation.continue);  
        }
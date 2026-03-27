    import { test, expect } from '@playwright/test';
    import testData from '../fixtures/testData.json';

    import { fillOperationOverview } from './helpers/operation_overview';
    import { fillEventDetail } from './helpers/event_detail';
    import { fillAction_Needs } from './helpers/action_needs';
    import { fillOperation } from './helpers/operation';
    import { fillOperationalTimeframesAndContacts } from './helpers/otac';

    const scenarios = [
        { name: 'positive', data: testData.positive },
        { name: 'negative', data: testData.negative },
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
                async function locatorClick(fieldName: string) {
                    await page.locator(`[name="${fieldName}"]`).click();
                }

                const negAssert = (data.operation_overview as any).negative_assertions;

                // LOGIN - always uses positive data
                await page.goto('https://alpha-3.ifrc-go.dev.togglecorp.com/');
                await clickRole('link', testData.positive.operation_overview.login);
                await locatorFill('username', process.env.TEST_EMAIL!);
                await locatorFill('password', process.env.TEST_PASSWORD!);
                await clickRole('button', testData.positive.operation_overview.login);
                await page.waitForTimeout(1000);

                    //OPERATION OVERVIEW SECTION 
                                    await clickRole('button',data.operation_overview.report_create);
                                    await clickRole('link',data.operation_overview.newDREF);
                                    await locatorClick('type_of_dref');
                                    await clickRole('button',data.operation_overview.drefType);
                                    await expect(page.getByRole('heading',{name:data.operation_overview.sharing})).toBeVisible();
                                    await expect(page.getByRole('button',{name:data.operation_overview.add})).toBeDisabled();
                                    await locatorClick('national_society');
                                    await locatorFill('national_society', 'Nep');
                                    await clickRole('button',data.operation_overview.national_society);
                                    await expect(page.locator('[name="national_society"]')).toHaveValue(data.operation_overview.national_society);

                            // NEGATIVE ASSERTION - National Society
                                    if (negAssert?.national_society_clear) {
                                    await page.getByRole('button', { name: 'Clear' }).nth(0).click();
                                    await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                    await locatorClick('national_society');
                                    await locatorFill('national_society', 'Nep');
                                    await clickRole('button', data.operation_overview.national_society);
                                    await expect(page.locator('[name="national_society"]')).toHaveValue(data.operation_overview.national_society);
                                    }

                                    await page.locator(`[placeholder="${data.operation_overview.placeholder}"]`).click();
                                    await clickRole('button',data.operation_overview.placeholder_value);
                                    await clickRole('button',data.operation_overview.copy);

                            //NEW RADIO BUTTONS APPEAR FOR FIRE, FLOOD, PLUVIAL/FLASHFLOOD
                                    await locatorClick('disaster_type');
                                    await clickRole('button',data.operation_overview.fire);
                                    await expect(page.locator('[name="disaster_type"]')).toHaveValue(data.operation_overview.fire);        
                                    await page.getByText(data.operation_overview.no, { exact: true }).nth(0).click();
                                    await page.getByText(data.operation_overview.yes, { exact: true }).nth(0).click();
                                    await expect(page.getByText(data.operation_overview.man_made_event)).toBeVisible();
                                    await locatorClick('disaster_type');
                                    await clickRole('button',data.operation_overview.coldwave);
                                    await expect(page.locator('[name="disaster_type"]')).toHaveValue(data.operation_overview.coldwave);
                                    await locatorClick('type_of_onset');
                                    await clickRole('button',data.operation_overview.sudden);
                                    await expect(page.locator('[name="type_of_onset"]')).toHaveValue(data.operation_overview.sudden);

                            // NEGATIVE ASSERTION - Type of Onset
                                    if (negAssert?.type_of_onset_clear) {
                                    await page.getByRole('button', { name: 'Clear' }).nth(3).click();
                                    await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                    await locatorClick('type_of_onset');
                                    await clickRole('button', data.operation_overview.sudden);
                                    await expect(page.locator('[name="type_of_onset"]')).toHaveValue(data.operation_overview.sudden);
                                    }

                                    await locatorClick('disaster_category');
                                    await clickRole('button',data.operation_overview.yellow);
                                    await expect(page.locator('[name="disaster_category"]')).toHaveValue("Yellow");
                                    await locatorClick('disaster_category');
                                    await clickRole('button',data.operation_overview.red);
                                    await expect(page.locator('[name="disaster_category"]')).toHaveValue(data.operation_overview.red);
                                    await expect(page.getByRole('heading',{name: data.operation_overview.crisis_categorization })).toBeVisible();

                            //FILE UPLOAD
                                    const fileInput = page.locator('input[type="file"]').nth(0);
                                    await expect (fileInput).toBeEnabled();
                                    await fileInput.setInputFiles('C:\\Users\\appus\\Downloads\\earthquake.jpeg');
                                    await expect(page.locator('[name="country"]')).toHaveValue(data.operation_overview.nepal);                
                                    await locatorClick('district');
                                    await page.getByTitle('Select All').click();
                                    await page.getByText(data.operation_overview.affected_country).click();
                                    await expect(page.locator('[name="district"]')).toHaveValue(data.operation_overview.regions);
                                    await locatorFill('title', data.operation_overview.title);
                                    await expect(page.locator('[name="title"]')).toHaveValue(data.operation_overview.title);

                            // NEGATIVE ASSERTION - Title
                                    if (negAssert?.title_empty) {
                                    await locatorFill('title', '   ');
                                    await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                    await locatorFill('title', data.operation_overview.title);
                                    await expect(page.locator('[name="title"]')).toHaveValue(data.operation_overview.title);
                                    }

                                    await page.getByText(data.operation_overview.no, { exact: true }).click();
                                    await page.getByText(data.operation_overview.yes, { exact: true }).click();

                            // File Upload
                                    const fileInput1 = page.locator('input[type="file"]').nth(1);
                                    await expect (fileInput1).toBeEnabled();
                                    await fileInput1.setInputFiles("C:\\Users\\appus\\Downloads\\earthquake.jpeg");
                                    await page.locator('[name="caption"]').nth(0).fill(data.operation_overview.caption);
                                    await expect(page.locator('[name="caption"]').nth(0)).toHaveValue(data.operation_overview.caption);

                            //File Upload
                                    const fileInput2 = page.locator('input[type="file"]').nth(2);
                                    await expect (fileInput2).toBeEnabled();
                                    await fileInput2.setInputFiles("C:\\Users\\appus\\Downloads\\earthquake.jpeg");
                                    await page.locator('[name="caption"]').nth(1).fill(data.operation_overview.caption);
                                    await expect(page.locator('[name="caption"]').nth(1)).toHaveValue(data.operation_overview.caption);
                                    await clickRole('button', data.operation.continue);  

                            // EVENT DETAIL SECTION
                                    await locatorClick('event_date');
                                    await locatorFill('event_date', data.event_detail.date1);
                                    await expect(page.locator('[name="event_date"]')).toHaveValue(data.event_detail.date1);
                                    await locatorFill('num_affected', data.event_detail.num_affected);
                                    await expect(page.locator('[name="num_affected"]')).toHaveValue(data.event_detail.num_affected);

                            // NEGATIVE ASSERTION - num_affected
                                    if ((data.event_detail as any).negative_assertions?.num_affected_negative) {
                                        await locatorFill('num_affected', '-5');
                                        await expect(page.getByText('The field must be a positive number without decimal').nth(0)).toBeVisible();
                                        await page.pause();
                                        await locatorFill('num_affected', data.event_detail.num_affected);
                                        await expect(page.locator('[name="num_affected"]')).toHaveValue(data.event_detail.num_affected);
                                    }
                                    
                                    await locatorFill('people_in_need', data.event_detail.people_in_need);
                                    await expect(page.locator('[name="people_in_need"]')).toHaveValue(data.event_detail.people_in_need);
                                    await locatorFill('estimated_number_of_affected_male', data.event_detail.estimated_number_of_affected_male);
                                    await expect(page.locator('[name="estimated_number_of_affected_male"]')).toHaveValue(data.event_detail.estimated_number_of_affected_male);
                                    await locatorFill('estimated_number_of_affected_female', data.event_detail.estimated_number_of_affected_female);
                                    await expect(page.locator('[name="estimated_number_of_affected_female"]')).toHaveValue(data.event_detail.estimated_number_of_affected_female);
                                    await locatorFill('estimated_number_of_affected_girls_under_18', data.event_detail.estimated_number_of_affected_girls_under_18);
                                    await expect(page.locator('[name="estimated_number_of_affected_girls_under_18"]')).toHaveValue(data.event_detail.estimated_number_of_affected_girls_under_18);
                                    await locatorFill('estimated_number_of_affected_boys_under_18', data.event_detail.estimated_number_of_affected_boys_under_18);
                                    await expect(page.locator('[name="estimated_number_of_affected_boys_under_18"]')).toHaveValue(data.event_detail.estimated_number_of_affected_boys_under_18);
                                    await locatorFill('event_description', data.event_detail.test_description);
                                    await expect(page.locator('[name="event_description"]')).toHaveValue(data.event_detail.test_description);
                                    await clickRole('button', data.event_detail.new_source);
                                    await locatorFill('source_name', data.event_detail.test_description);
                                    await locatorFill('source_link', data.event_detail.test_link);
                                    await clickRole('button', data.event_detail.new_source);
                                    await page.locator('[name="source_name"]').nth(1).fill(data.event_detail.test_description);
                                    await page.locator('[name="source_link"]').nth(1).fill(data.event_detail.test_link);
                                    await clickRole('button', data.event_detail.new_source);
                                    await page.locator('[name="source_name"]').nth(2).fill(data.event_detail.test_description);
                                    await page.locator('[name="source_link"]').nth(2).fill(data.event_detail.test_link);
                                    await page.getByRole('button', { name: data.event_detail.delete_source }).nth(2).click();
                                    await page.getByRole('button', { name: data.event_detail.delete_source }).nth(1).click();


                                    await expect(page.locator('[name="source_name"]')).toHaveValue(data.event_detail.test_description);
                                    //negative assertoions
                                    await page.locator('[name="source_name"]').clear();
                                    await expect(page.getByText('The field is required').nth(0)).toBeVisible();
                                    
                                    await expect(page.locator('[name="source_link"]')).toHaveValue(data.event_detail.test_link);
                                    await page.locator('[name="source_link"]').clear();
                                    await locatorFill('source_link', 'not a url');

                                    await expect(page.getByText('The field must be a valid url').nth(0)).toBeVisible();
                

                                    // File Upload - Event Detail
                                    const fileInput_ED = page.locator('input[type="file"]');
                                    await expect(fileInput_ED).toBeEnabled();
                                    await fileInput_ED.setInputFiles("C:\\Users\\appus\\Downloads\\earthquake.jpeg");
                                    await locatorFill('0', data.operation_overview.caption);

                                    // File Upload - Event Detail 
                                    const fileInput_ED1 = page.locator('input[type="file"]');
                                    await expect(fileInput_ED1).toBeEnabled();
                                    await fileInput_ED1.setInputFiles("C:\\Users\\appus\\Downloads\\earthquake.jpeg");
                                    await locatorFill('1', data.operation_overview.caption);
                                    await page.getByRole('button', { name: data.event_detail.remove }).nth(1).click();
                                    await expect(page.locator('[name="0"]')).toHaveValue(data.operation_overview.caption);
                                    await clickRole('button', data.operation.continue);

            });
        }

    });
import { test, expect } from '@playwright/test';
import allData from '../fixtures/testData.json';
import { apiAssertions } from './helpers/apiassertions';

const BASE_URL = 'https://alpha-3-api.ifrc-go.dev.togglecorp.com';

const scenarios = [
    { name: 'positive', data: allData.positive },
    { name: 'negative', data: allData.negative },
];

test.describe('DREF API Form Submission', () => {
    
    for (const { name, data } of scenarios) {
        test(`Create DREF via API - ${name} path`, async ({ playwright }) => {
            
            // Create API request context
            const apiContext = await playwright.request.newContext({
                baseURL: BASE_URL,
            });

            // Login and get auth token
            const loginResponse = await apiContext.post('/get_auth_token', {
                headers: { 'Content-Type': 'application/json' },
                data: {
                    username: process.env.TEST_EMAIL,
                    password: process.env.TEST_PASSWORD,
                }
            });

            expect(loginResponse.status()).toBe(200);
            const loginBody = await loginResponse.json();
            const token = loginBody.token;
            console.log('Auth token received:', token ? 'yes' : 'no');

            // Build payload from data
            const payload = {

                // Operation Overview
                title : '',
                type_of_dref : 1,       // Assessment
                type_of_onset: 2,       // Sudden
                disaster_category : 2,       // Red
                disaster_type : 14,      // Cold Wave
                national_society : 123,     // Nepal Red Cross
                country : 123,     // Nepal
                district : [3529, 3528, 3527, 3526, 3531, 3530, 3532],

                // Event Detail
                event_date : data.event_detail.date1,
                num_affected : Number(data.event_detail.num_affected),
                people_in_need : Number(data.event_detail.people_in_need),
                estimated_number_of_affected_male : Number(data.event_detail.estimated_number_of_affected_male),
                estimated_number_of_affected_female : Number(data.event_detail.estimated_number_of_affected_female),
                estimated_number_of_affected_girls_under_18 : Number(data.event_detail.estimated_number_of_affected_girls_under_18),
                estimated_number_of_affected_boys_under_18 : Number(data.event_detail.estimated_number_of_affected_boys_under_18),
                event_description : data.event_detail.test_description,
                source_information: [
                    {
                        source_name : data.event_detail.test_description,
                        source_link : data.event_detail.test_link,
                    }
                ],

                // Action Needs
                ns_respond_date : data.action_needs.date1,
                ifrc : data.action_needs.IFRC.trim(),
                icrc : data.action_needs.ICRC.trim(),
                partner_national_society : data.action_needs.test_description,
                national_authorities : data.action_needs.test_description,
                un_or_other_actor : data.action_needs.test_description,
                major_coordination_mechanism : data.action_needs.test_description,
                government_requested_assistance : true,
                is_there_major_coordination_mechanism : true,
                national_society_actions: [
                    {
                        title : "health",
                        description : data.action_needs.health_value,
                    }
                ],

                // Operation
                operation_objective : data.operation.test_description,
                response_strategy : data.operation.test_description,
                people_assisted : data.operation.test_description,
                selection_criteria : data.operation.test_description,
                total_targeted_population : Number(data.operation.total_targeted_population),
                disability_people_per : Number(data.operation.disability_people_per),
                people_per_urban : Number(data.operation.people_per_urban),
                people_per_local : Number(data.operation.people_per_local),
                displaced_people : Number(data.operation.displaced_people),
                amount_requested : Number(data.operation.amount_requested),
                risk_security_concern : data.operation.test_description,
                human_resource : data.operation.test_description,
                is_volunteer_team_diverse : data.operation.test_description,
                surge_personnel_deployed : data.operation.test_description,
                is_surge_personnel_deployed : true,
                did_national_society : true,
                risk_security: [
                    {
                        risk : data.operation.risk1,
                        mitigation : data.operation.mitigation1,
                    }
                ],
                planned_interventions: [
                    {
                        title : "health",
                        budget : Number(data.operation.budget_value),
                        person_targeted : Number(data.operation.person_targeted),
                        description : data.operation.test_description,
                        indicators: [
                            {
                                title : data.operation.test_description,
                                target : Number(data.operation.target),
                            }
                        ]
                    }
                ],

                // OTAC
                ns_request_date : data.otac.date1,
                submission_to_geneva : data.otac.date2,
                date_of_approval : data.otac.date3,
                operation_timeframe : Number(data.otac.operation_timeframe_value),
                publishing_date : data.otac.date4,
                appeal_code : data.otac.appeal_code_value,
                glide_code : data.otac.glide_code_value,
                national_society_hotline_phone_number : data.otac.national_society_hotline_phone_number,

                ifrc_appeal_manager_name : data.otac.test_description,
                ifrc_appeal_manager_title : data.otac.title_description,
                ifrc_appeal_manager_email : data.otac.test_link,
                ifrc_appeal_manager_phone_number : data.otac.test_phone,

                ifrc_project_manager_name : data.otac.test_description,
                ifrc_project_manager_title : data.otac.title_description,
                ifrc_project_manager_email : data.otac.test_link,
                ifrc_project_manager_phone_number : data.otac.test_phone,

                national_society_contact_name : data.otac.test_description,
                national_society_contact_title : data.otac.title_description,
                national_society_contact_email : data.otac.test_link,
                national_society_contact_phone_number : data.otac.test_phone,

                ifrc_emergency_name : data.otac.test_description,
                ifrc_emergency_title : data.otac.title_description,
                ifrc_emergency_email : data.otac.test_link,
                ifrc_emergency_phone_number : data.otac.test_phone,

                regional_focal_point_name : data.otac.test_description,
                regional_focal_point_title : data.otac.title_description,
                regional_focal_point_email : data.otac.test_link,
                regional_focal_point_phone_number : data.otac.test_phone,

                media_contact_name : data.otac.test_description,
                media_contact_title : data.otac.title_description,
                media_contact_email : data.otac.test_link,
                media_contact_phone_number : data.otac.test_phone,

                national_society_integrity_contact_name :data.otac.test_description,
                national_society_integrity_contact_title : data.otac.title_description,
                national_society_integrity_contact_email : data.otac.test_link,
                national_society_integrity_contact_phone_number : data.otac.test_phone,
            };

            // POST to DREF endpoint
            const drefResponse = await apiContext.post('/api/v2/dref/', {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                data: payload
            });

            console.log('DREF response status:', drefResponse.status());
            const body = await drefResponse.json();
            console.log('Created DREF ID:', body.id);

            // Reuse apiAssertions helper to validate response
            await apiAssertions(null, data, drefResponse, body);


        });
    }

});
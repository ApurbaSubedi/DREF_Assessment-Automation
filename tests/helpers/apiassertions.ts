import { expect, Page } from '@playwright/test';

export async function apiAssertions(page: any, testData: any, response: any, body: any) {

        // Status
        expect(response.status()).toBe(201);

        // Operation Overview
        expect(body.title).toBe(testData.operation_overview.title);
        expect(body.type_of_dref_display).toBe(testData.operation_overview.drefType);
        expect(body.type_of_onset_display).toBe(testData.operation_overview.sudden);
        expect(body.disaster_category_display).toBe(testData.operation_overview.red);
        expect(body.disaster_type_details.name).toBe(testData.operation_overview.coldwave);
        expect(body.country_details.name).toBe(testData.operation_overview.nepal);
        expect(body.country_details.society_name).toBe(testData.operation_overview.national_society);

        // District details - assert all 7 regions are present
        const districtNames = body.district_details.map((d: any) => d.name);
        expect(districtNames).toContain('Province 1');
        expect(districtNames).toContain('Province 2');
        expect(districtNames).toContain('Bagmati');
        expect(districtNames).toContain('Gandaki');
        expect(districtNames).toContain('Lumbini');
        expect(districtNames).toContain('Karnali');
        expect(districtNames).toContain('Sudurpashchim');

        // Event Detail
        expect(body.event_date).toBe(testData.event_detail.date1);
        expect(body.num_affected).toBe(Number(testData.event_detail.num_affected));
        expect(body.estimated_number_of_affected_male).toBe(Number(testData.event_detail.estimated_number_of_affected_male));
        expect(body.estimated_number_of_affected_female).toBe(Number(testData.event_detail.estimated_number_of_affected_female));
        expect(body.estimated_number_of_affected_girls_under_18).toBe(Number(testData.event_detail.estimated_number_of_affected_girls_under_18));
        expect(body.estimated_number_of_affected_boys_under_18).toBe(Number(testData.event_detail.estimated_number_of_affected_boys_under_18));
        expect(body.event_description).toBe(testData.event_detail.test_description);

        // Source information
        expect(body.source_information[0].source_name).toBe(testData.event_detail.test_description);
        expect(body.source_information[0].source_link).toBe(testData.event_detail.test_link);

        // Action Needs
        expect(body.ns_respond_date).toBe(testData.action_needs.date1);
        expect(body.national_society_actions[0].title_display).toBe(testData.action_needs.health);
        expect(body.national_society_actions[0].description).toBe(testData.action_needs.health_value);
        expect(body.ifrc).toBe(testData.action_needs.IFRC.trim());
        expect(body.icrc).toBe(testData.action_needs.ICRC.trim());
        expect(body.partner_national_society).toBe(testData.action_needs.test_description);
        expect(body.national_authorities).toBe(testData.action_needs.test_description);
        expect(body.un_or_other_actor).toBe(testData.action_needs.test_description);
        expect(body.major_coordination_mechanism).toBe(testData.action_needs.test_description);

        // Operation
        expect(body.operation_objective).toBe(testData.operation.test_description);
        expect(body.response_strategy).toBe(testData.operation.test_description);
        expect(body.people_assisted).toBe(testData.operation.test_description);
        expect(body.selection_criteria).toBe(testData.operation.test_description);
        expect(body.total_targeted_population).toBe(Number(testData.operation.total_targeted_population));
        expect(body.disability_people_per).toBe(Number(testData.operation.disability_people_per));
        expect(body.people_per_urban).toBe(Number(testData.operation.people_per_urban));
        expect(body.people_per_local).toBe(Number(testData.operation.people_per_local));
        expect(body.displaced_people).toBe(Number(testData.operation.displaced_people));
        expect(body.risk_security[0].risk).toBe(testData.operation.risk1);
        expect(body.risk_security[0].mitigation).toBe(testData.operation.mitigation1);
        expect(body.risk_security_concern).toBe(testData.operation.test_description);
        expect(body.amount_requested).toBe(Number(testData.operation.amount_requested));
        expect(body.planned_interventions[0].title_display).toBe(testData.operation.health_value);
        expect(body.planned_interventions[0].budget).toBe(Number(testData.operation.budget_value));
        expect(body.planned_interventions[0].person_targeted).toBe(Number(testData.operation.person_targeted));
        expect(body.planned_interventions[0].indicators[0].title).toBe(testData.operation.test_description);
        expect(body.planned_interventions[0].indicators[0].target).toBe(Number(testData.operation.target));
        expect(body.human_resource).toBe(testData.operation.test_description);
        expect(body.is_volunteer_team_diverse).toBe(testData.operation.test_description);
        expect(body.surge_personnel_deployed).toBe(testData.operation.test_description);

        // OTAC
        expect(body.ns_request_date).toBe(testData.otac.date1);
        expect(body.submission_to_geneva).toBe(testData.otac.date2);
        expect(body.date_of_approval).toBe(testData.otac.date3);
        expect(body.operation_timeframe).toBe(Number(testData.otac.operation_timeframe_value));
        expect(body.publishing_date).toBe(testData.otac.date4);
        expect(body.appeal_code).toBe(testData.otac.appeal_code_value);
        expect(body.glide_code).toBe(testData.otac.glide_code_value);
        expect(body.ifrc_appeal_manager_name).toBe(testData.otac.test_description);
        expect(body.ifrc_appeal_manager_title).toBe(testData.otac.title_description);
        expect(body.ifrc_appeal_manager_email).toBe(testData.otac.test_link);
        expect(body.ifrc_appeal_manager_phone_number).toBe(testData.otac.test_phone);
        expect(body.ifrc_project_manager_name).toBe(testData.otac.test_description);
        expect(body.ifrc_project_manager_title).toBe(testData.otac.title_description);
        expect(body.ifrc_project_manager_email).toBe(testData.otac.test_link);
        expect(body.ifrc_project_manager_phone_number).toBe(testData.otac.test_phone);
        expect(body.national_society_contact_name).toBe(testData.otac.test_description);
        expect(body.national_society_contact_title).toBe(testData.otac.title_description);
        expect(body.national_society_contact_email).toBe(testData.otac.test_link);
        expect(body.national_society_contact_phone_number).toBe(testData.otac.test_phone);
        expect(body.ifrc_emergency_name).toBe(testData.otac.test_description);
        expect(body.ifrc_emergency_title).toBe(testData.otac.title_description);
        expect(body.ifrc_emergency_email).toBe(testData.otac.test_link);
        expect(body.ifrc_emergency_phone_number).toBe(testData.otac.test_phone);
        expect(body.regional_focal_point_name).toBe(testData.otac.test_description);
        expect(body.regional_focal_point_title).toBe(testData.otac.title_description);
        expect(body.regional_focal_point_email).toBe(testData.otac.test_link);
        expect(body.regional_focal_point_phone_number).toBe(testData.otac.test_phone);
        expect(body.media_contact_name).toBe(testData.otac.test_description);
        expect(body.media_contact_title).toBe(testData.otac.title_description);
        expect(body.media_contact_email).toBe(testData.otac.test_link);
        expect(body.media_contact_phone_number).toBe(testData.otac.test_phone);
        expect(body.national_society_integrity_contact_name).toBe(testData.otac.test_description);
        expect(body.national_society_integrity_contact_title).toBe(testData.otac.title_description);
        expect(body.national_society_integrity_contact_email).toBe(testData.otac.test_link);
        expect(body.national_society_integrity_contact_phone_number).toBe(testData.otac.test_phone);
        expect(body.national_society_hotline_phone_number).toBe(testData.otac.national_society_hotline_phone_number);
}